"""Core data models for the Dragon Dance Academy platform."""
from __future__ import annotations

from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    class Roles(models.TextChoices):
        ADMIN = "admin", _("Администратор")
        TEACHER = "teacher", _("Преподаватель")
        STUDENT = "student", _("Студент")

    role = models.CharField(
        max_length=20,
        choices=Roles.choices,
        default=Roles.STUDENT,
        verbose_name=_("Роль"),
    )

    def __str__(self) -> str:  # pragma: no cover - human readable helper
        return f"{self.get_full_name() or self.username} ({self.get_role_display()})"


class Course(models.Model):
    name = models.CharField(max_length=255, verbose_name=_("Название"))
    slug = models.SlugField(unique=True, verbose_name=_("Слаг"))
    description = models.TextField(verbose_name=_("Описание"))
    price = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name=_("Цена"),
    )
    schedule = models.TextField(verbose_name=_("Расписание"))
    instructor = models.ForeignKey(
        "User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="courses",
        verbose_name=_("Преподаватель"),
    )
    is_active = models.BooleanField(default=True, verbose_name=_("Активен"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Создан"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Обновлён"))

    class Meta:
        ordering = ("name",)
        verbose_name = _("Курс")
        verbose_name_plural = _("Курсы")

    def __str__(self) -> str:  # pragma: no cover - human readable helper
        return self.name


class Lesson(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="lessons",
        verbose_name=_("Курс"),
    )
    title = models.CharField(max_length=255, verbose_name=_("Название"))
    description = models.TextField(blank=True, verbose_name=_("Описание"))
    start_at = models.DateTimeField(verbose_name=_("Дата и время"))
    end_at = models.DateTimeField(verbose_name=_("Окончание"))
    teacher = models.ForeignKey(
        "User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="lessons",
        verbose_name=_("Преподаватель"),
    )
    location = models.CharField(max_length=255, verbose_name=_("Локация"))
    seats = models.PositiveIntegerField(default=12, verbose_name=_("Места"))

    class Meta:
        ordering = ("start_at",)
        verbose_name = _("Урок")
        verbose_name_plural = _("Уроки")

    def __str__(self) -> str:  # pragma: no cover
        return f"{self.course.name}: {self.title}"

    @property
    def seats_left(self) -> int:
        return max(self.seats - self.registrations.filter(status=Registration.Status.CONFIRMED).count(), 0)


class Registration(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", _("В ожидании")
        CONFIRMED = "confirmed", _("Подтверждён")
        CANCELLED = "cancelled", _("Отменён")

    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="registrations")
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="registrations")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="registrations")
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    note = models.TextField(blank=True)

    class Meta:
        unique_together = ("user", "lesson")
        verbose_name = _("Регистрация")
        verbose_name_plural = _("Регистрации")

    def __str__(self) -> str:  # pragma: no cover
        return f"{self.user} -> {self.lesson}"


class BlogPost(models.Model):
    title = models.CharField(max_length=255, verbose_name=_("Заголовок"))
    slug = models.SlugField(unique=True, verbose_name=_("Слаг"))
    content = models.TextField(verbose_name=_("Контент"))
    published_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Опубликовано"))
    author = models.ForeignKey(
        "User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="posts",
        verbose_name=_("Автор"),
    )
    is_featured = models.BooleanField(default=False, verbose_name=_("Важная новость"))

    class Meta:
        ordering = ("-published_at",)
        verbose_name = _("Публикация")
        verbose_name_plural = _("Публикации")

    def __str__(self) -> str:  # pragma: no cover
        return self.title


class Video(models.Model):
    youtube_id = models.CharField(max_length=50, unique=True, verbose_name=_("ID YouTube"))
    title = models.CharField(max_length=255, verbose_name=_("Название"))
    description = models.TextField(blank=True, verbose_name=_("Описание"))
    published_at = models.DateTimeField(verbose_name=_("Дата публикации"))
    url = models.URLField(verbose_name=_("Ссылка"))
    thumbnail_url = models.URLField(blank=True, verbose_name=_("Превью"))

    class Meta:
        ordering = ("-published_at",)
        verbose_name = _("Видео")
        verbose_name_plural = _("Видео")

    def __str__(self) -> str:  # pragma: no cover
        return self.title


class ContactRequest(models.Model):
    name = models.CharField(max_length=255, verbose_name=_("Имя"))
    email = models.EmailField(verbose_name=_("Email"))
    message = models.TextField(verbose_name=_("Сообщение"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Создано"))
    processed = models.BooleanField(default=False, verbose_name=_("Обработано"))

    class Meta:
        ordering = ("-created_at",)
        verbose_name = _("Обратная связь")
        verbose_name_plural = _("Обратная связь")

    def __str__(self) -> str:  # pragma: no cover
        return f"{self.email} ({self.created_at:%Y-%m-%d})"
