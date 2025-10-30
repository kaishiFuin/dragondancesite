"""Admin registrations for the academy app."""
from __future__ import annotations

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from . import models


@admin.register(models.User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = DjangoUserAdmin.fieldsets + (("Роль", {"fields": ("role",)}),)
    list_display = ("username", "email", "first_name", "last_name", "role", "is_active")
    list_filter = ("role", "is_staff", "is_superuser", "is_active")
    search_fields = ("username", "email", "first_name", "last_name")


@admin.register(models.Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("name", "instructor", "price", "is_active", "updated_at")
    list_filter = ("is_active", "instructor")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(models.Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("title", "course", "start_at", "end_at", "teacher", "seats")
    list_filter = ("course", "teacher")
    search_fields = ("title", "description")


@admin.register(models.Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ("user", "course", "lesson", "status", "created_at")
    list_filter = ("status", "course")
    search_fields = ("user__username", "course__name", "lesson__title")


@admin.register(models.BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "published_at", "is_featured")
    list_filter = ("is_featured",)
    search_fields = ("title", "content")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(models.Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("title", "youtube_id", "published_at")
    search_fields = ("title", "youtube_id")


@admin.register(models.ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "created_at", "processed")
    list_filter = ("processed",)
    search_fields = ("name", "email")
    list_editable = ("processed",)
