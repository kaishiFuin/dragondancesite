"""ViewSets powering the REST API."""
from __future__ import annotations

from django.db.models import Count
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from backend.school import models, serializers


class IsAdminOrReadOnly(permissions.BasePermission):
    """Allow only admins to perform write actions."""

    def has_permission(self, request, view):  # type: ignore[override]
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class CourseViewSet(viewsets.ModelViewSet):
    queryset = models.Course.objects.prefetch_related('lessons').all()
    serializer_class = serializers.CourseSerializer
    permission_classes = (IsAdminOrReadOnly,)
    filterset_fields = ('level',)
    search_fields = ('title', 'description')
    ordering_fields = ('title', 'price', 'created_at')


class LessonViewSet(viewsets.ModelViewSet):
    queryset = models.Lesson.objects.select_related('course', 'instructor').annotate(
        registrations_count=Count('registrations')
    )
    serializer_class = serializers.LessonSerializer
    permission_classes = (IsAdminOrReadOnly,)
    filterset_fields = ('course', 'instructor')
    ordering_fields = ('start',)

    @action(detail=True, methods=['post'], permission_classes=(permissions.IsAuthenticated,))
    def register(self, request, pk=None):  # type: ignore[override]
        lesson = self.get_object()
        registration, created = models.Registration.objects.get_or_create(
            user=request.user,
            lesson=lesson,
        )
        if not created:
            return Response({'detail': 'You are already registered.'}, status=200)
        serializer = serializers.RegistrationSerializer(registration)
        return Response(serializer.data, status=201)


class RegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.RegistrationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):  # type: ignore[override]
        if self.request.user.is_staff:
            return models.Registration.objects.select_related('user', 'lesson__course').all()
        return models.Registration.objects.select_related('user', 'lesson__course').filter(
            user=self.request.user
        )

    def perform_create(self, serializer):  # type: ignore[override]
        serializer.save(user=self.request.user)


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = models.BlogPost.objects.select_related('author').all()
    serializer_class = serializers.BlogPostSerializer
    permission_classes = (IsAdminOrReadOnly,)
    lookup_field = 'slug'


class VideoViewSet(viewsets.ModelViewSet):
    queryset = models.Video.objects.all()
    serializer_class = serializers.VideoSerializer
    permission_classes = (IsAdminOrReadOnly,)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = models.ContactMessage.objects.all()
    serializer_class = serializers.ContactMessageSerializer
    permission_classes = (IsAdminOrReadOnly,)

    def get_permissions(self):  # type: ignore[override]
        if self.action == 'create':
            return (permissions.AllowAny(),)
        return super().get_permissions()
