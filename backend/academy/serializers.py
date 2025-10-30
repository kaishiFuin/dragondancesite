"""Serializers for the public REST API."""
from __future__ import annotations

from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import serializers

from .models import BlogPost, ContactRequest, Course, Lesson, Registration, Video

User = get_user_model()


class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "role")


class CourseSerializer(serializers.ModelSerializer):
    instructor = InstructorSerializer(read_only=True)

    class Meta:
        model = Course
        fields = (
            "id",
            "name",
            "slug",
            "description",
            "price",
            "schedule",
            "instructor",
            "is_active",
            "created_at",
            "updated_at",
        )


class LessonSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    teacher = InstructorSerializer(read_only=True)
    seats_left = serializers.IntegerField(read_only=True)

    class Meta:
        model = Lesson
        fields = (
            "id",
            "title",
            "description",
            "start_at",
            "end_at",
            "teacher",
            "course",
            "location",
            "seats",
            "seats_left",
        )


class LessonRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ("id", "lesson", "course", "status", "note", "created_at")
        read_only_fields = ("status", "created_at", "course")

    def validate(self, attrs: dict) -> dict:
        lesson: Lesson = attrs["lesson"]
        if lesson.start_at < timezone.now():
            raise serializers.ValidationError("Вы не можете записаться на прошедший урок.")
        if lesson.seats_left <= 0:
            raise serializers.ValidationError("Нет свободных мест на занятие.")
        attrs["course"] = lesson.course
        return attrs

    def create(self, validated_data: dict) -> Registration:
        user = self.context["request"].user
        return Registration.objects.create(user=user, **validated_data)


class BlogPostSerializer(serializers.ModelSerializer):
    author = InstructorSerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = ("id", "title", "slug", "content", "published_at", "author", "is_featured")


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ("id", "youtube_id", "title", "description", "published_at", "url", "thumbnail_url")


class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = ("id", "name", "email", "message", "created_at")
        read_only_fields = ("created_at",)


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("id", "username", "password", "email", "first_name", "last_name")

    def create(self, validated_data: dict) -> User:
        user = User.objects.create_user(**validated_data)
        return user
