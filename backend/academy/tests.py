"""Minimal API tests covering critical flows."""
from __future__ import annotations

from datetime import timedelta

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient

from .models import Course, Lesson

User = get_user_model()


class RegistrationApiTests(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.teacher = User.objects.create_user(
            username="teacher", password="Password123", role="teacher"
        )
        self.student = User.objects.create_user(
            username="student", password="Password123", role="student"
        )
        self.course = Course.objects.create(
            name="Hip-hop Beginners",
            slug="hip-hop-beginners",
            description="Introductory course",
            price=100,
            schedule="Every Monday",
            instructor=self.teacher,
        )
        self.lesson = Lesson.objects.create(
            course=self.course,
            title="Week 1",
            description="Basics",
            start_at=timezone.now() + timedelta(days=1),
            end_at=timezone.now() + timedelta(days=1, hours=2),
            teacher=self.teacher,
            location="Main Hall",
            seats=10,
        )

    def authenticate(self):
        self.client.force_authenticate(user=self.student)

    def test_student_can_register_for_lesson(self):
        self.authenticate()
        response = self.client.post(
            "/api/registrations/",
            {"lesson": self.lesson.id, "note": "See you"},
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["lesson"], self.lesson.id)

    def test_registration_fails_for_past_lesson(self):
        self.lesson.start_at = timezone.now() - timedelta(days=1)
        self.lesson.save()
        self.authenticate()
        response = self.client.post(
            "/api/registrations/",
            {"lesson": self.lesson.id},
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("lesson", response.json())


class ContactFormTests(TestCase):
    def test_contact_form_submission(self):
        client = APIClient()
        response = client.post(
            "/api/contact/",
            {"name": "Ivan", "email": "ivan@example.com", "message": "Hello"},
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["email"], "ivan@example.com")
