"""Database models for the Dragon Dance School platform."""
from __future__ import annotations

from django.conf import settings
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Course(TimeStampedModel):
    LEVEL_CHOICES = (
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    )

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField()
    level = models.CharField(max_length=32, choices=LEVEL_CHOICES, default='beginner')
    price = models.DecimalField(max_digits=8, decimal_places=2)
    duration_weeks = models.PositiveIntegerField(default=4)
    image = models.URLField(blank=True)

    class Meta:
        ordering = ('title',)

    def __str__(self) -> str:
        return self.title


class Lesson(TimeStampedModel):
    course = models.ForeignKey(Course, related_name='lessons', on_delete=models.CASCADE)
    start = models.DateTimeField()
    end = models.DateTimeField()
    location = models.CharField(max_length=255)
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    capacity = models.PositiveIntegerField(default=12)

    class Meta:
        ordering = ('start',)

    def __str__(self) -> str:
        return f"{self.course.title} - {self.start:%Y-%m-%d %H:%M}"


class Registration(TimeStampedModel):
    STATUS_CHOICES = (
        ('registered', 'Registered'),
        ('cancelled', 'Cancelled'),
        ('waitlist', 'Waitlist'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='registrations', on_delete=models.CASCADE)
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default='registered')

    class Meta:
        unique_together = ('user', 'lesson')
        ordering = ('-created_at',)

    def __str__(self) -> str:
        return f"{self.user} -> {self.lesson} ({self.status})"


class BlogPost(TimeStampedModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    content = models.TextField()
    published_at = models.DateTimeField(null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ('-published_at', '-created_at')

    def __str__(self) -> str:
        return self.title


class Video(TimeStampedModel):
    title = models.CharField(max_length=255)
    youtube_id = models.CharField(max_length=64)
    description = models.TextField(blank=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ('-published_at', 'title')

    def __str__(self) -> str:
        return self.title


class ContactMessage(TimeStampedModel):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    processed = models.BooleanField(default=False)

    class Meta:
        ordering = ('processed', '-created_at')

    def __str__(self) -> str:
        return f"{self.name} <{self.email}>"
