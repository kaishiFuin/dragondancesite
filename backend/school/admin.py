"""Admin registrations for core models."""
from django.contrib import admin

from backend.school import models


@admin.register(models.Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'level', 'price', 'duration_weeks')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('level',)


@admin.register(models.Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('course', 'start', 'end', 'instructor', 'location')
    list_filter = ('course', 'instructor', 'start')
    date_hierarchy = 'start'


@admin.register(models.Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('user', 'lesson', 'status', 'created_at')
    list_filter = ('status', 'lesson__course')
    autocomplete_fields = ('user', 'lesson')


@admin.register(models.BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_published', 'published_at')
    list_filter = ('is_published',)
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(models.Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'youtube_id', 'published_at')
    search_fields = ('title', 'youtube_id')


@admin.register(models.ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'processed', 'created_at')
    list_filter = ('processed',)
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at', 'updated_at')
