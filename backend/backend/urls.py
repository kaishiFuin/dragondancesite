"""Root URL configuration for the backend API."""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from backend.school import views as school_views

router = routers.DefaultRouter()
router.register('courses', school_views.CourseViewSet, basename='course')
router.register('lessons', school_views.LessonViewSet, basename='lesson')
router.register('registrations', school_views.RegistrationViewSet, basename='registration')
router.register('posts', school_views.BlogPostViewSet, basename='blogpost')
router.register('videos', school_views.VideoViewSet, basename='video')
router.register('contacts', school_views.ContactMessageViewSet, basename='contact')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('backend.school.auth_urls')),
    path('api/', include(router.urls)),
]
