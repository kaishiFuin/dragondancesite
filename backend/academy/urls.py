"""URL configuration for academy app."""
from __future__ import annotations

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    BlogPostViewSet,
    ContactRequestView,
    CourseViewSet,
    LessonViewSet,
    RegistrationViewSet,
    UserRegistrationView,
    VideoViewSet,
)

router = DefaultRouter()
router.register(r"courses", CourseViewSet, basename="course")
router.register(r"lessons", LessonViewSet, basename="lesson")
router.register(r"registrations", RegistrationViewSet, basename="registration")
router.register(r"posts", BlogPostViewSet, basename="post")
router.register(r"videos", VideoViewSet, basename="video")

urlpatterns = [
    path("", include(router.urls)),
    path("auth/register/", UserRegistrationView.as_view(), name="user-register"),
    path("contact/", ContactRequestView.as_view(), name="contact"),
]
