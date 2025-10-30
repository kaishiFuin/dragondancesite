"""View layer for REST API endpoints."""
from __future__ import annotations

from decimal import Decimal, InvalidOperation

from django.db.models import Q
from django.utils import timezone
from rest_framework import mixins, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import BlogPost, ContactRequest, Course, Lesson, Registration, Video
from .serializers import (
    BlogPostSerializer,
    ContactRequestSerializer,
    CourseSerializer,
    LessonRegistrationSerializer,
    LessonSerializer,
    UserRegistrationSerializer,
    VideoSerializer,
)


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.filter(is_active=True).select_related("instructor")
    pagination_class = None

    def get_queryset(self):  # pragma: no cover - simple filtering
        qs = super().get_queryset()
        price_to = self.request.query_params.get("price_to")
        if price_to:
            try:
                qs = qs.filter(price__lte=Decimal(price_to))
            except (InvalidOperation, TypeError):
                pass
        teacher = self.request.query_params.get("teacher")
        if teacher:
            qs = qs.filter(instructor__id=teacher)
        query = self.request.query_params.get("q")
        if query:
            qs = qs.filter(Q(name__icontains=query) | Q(description__icontains=query))
        return qs


class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LessonSerializer
    queryset = (
        Lesson.objects.select_related("course", "teacher", "course__instructor")
        .filter(course__is_active=True)
    )
    pagination_class = None

    def get_queryset(self):  # pragma: no cover - simple filtering
        qs = super().get_queryset()
        course_id = self.request.query_params.get("course")
        if course_id:
            qs = qs.filter(course_id=course_id)
        upcoming = self.request.query_params.get("upcoming", "true").lower() == "true"
        if upcoming:
            qs = qs.filter(start_at__gte=timezone.now())
        return qs


class RegistrationViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = LessonRegistrationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return (
            Registration.objects.filter(user=self.request.user)
            .select_related("lesson", "course")
            .order_by("-created_at")
        )

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def cancel(self, request, pk=None):
        registration = self.get_object()
        registration.status = Registration.Status.CANCELLED
        registration.save(update_fields=["status"])
        serializer = self.get_serializer(registration)
        return Response(serializer.data)


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.select_related("author")
    pagination_class = None

    def get_queryset(self):  # pragma: no cover
        qs = super().get_queryset()
        featured = self.request.query_params.get("featured")
        if featured:
            qs = qs.filter(is_featured=True)
        return qs


class VideoViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = VideoSerializer
    queryset = Video.objects.all()
    pagination_class = None


class ContactRequestView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = ContactRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact = ContactRequest.objects.create(**serializer.validated_data)
        return Response(ContactRequestSerializer(contact).data, status=status.HTTP_201_CREATED)


class UserRegistrationView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        output = UserRegistrationSerializer(user)
        return Response(output.data, status=status.HTTP_201_CREATED)
