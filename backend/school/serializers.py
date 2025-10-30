"""Serializers for API representation."""
from __future__ import annotations

from django.contrib.auth import get_user_model
from rest_framework import serializers

from backend.school import models

User = get_user_model()


class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')


class LessonSerializer(serializers.ModelSerializer):
    instructor = InstructorSerializer(read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)
    registrations_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = models.Lesson
        fields = (
            'id',
            'course',
            'course_title',
            'start',
            'end',
            'location',
            'instructor',
            'capacity',
            'registrations_count',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('created_at', 'updated_at')


class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = models.Course
        fields = (
            'id',
            'title',
            'slug',
            'description',
            'level',
            'price',
            'duration_weeks',
            'image',
            'lessons',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('created_at', 'updated_at')


class RegistrationSerializer(serializers.ModelSerializer):
    user = InstructorSerializer(read_only=True)

    class Meta:
        model = models.Registration
        fields = (
            'id',
            'user',
            'lesson',
            'status',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('created_at', 'updated_at')


class BlogPostSerializer(serializers.ModelSerializer):
    author = InstructorSerializer(read_only=True)

    class Meta:
        model = models.BlogPost
        fields = (
            'id',
            'title',
            'slug',
            'content',
            'published_at',
            'is_published',
            'author',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('created_at', 'updated_at')


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Video
        fields = (
            'id',
            'title',
            'youtube_id',
            'description',
            'published_at',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('created_at', 'updated_at')


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ContactMessage
        fields = (
            'id',
            'name',
            'email',
            'message',
            'processed',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('processed', 'created_at', 'updated_at')
