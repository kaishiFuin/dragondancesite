"""Basic API tests ensuring endpoints respond."""
from __future__ import annotations

from django.contrib.auth import get_user_model
from django.utils import timezone
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from backend.school import models


class CourseApiTests(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user('demo@example.com', 'demo@example.com', 'password123')
        self.course = models.Course.objects.create(
            title='Dragon Basics',
            slug='dragon-basics',
            description='Introductory dragon dance course.',
            price='1000.00',
        )

    def test_list_courses(self):
        response = self.client.get(reverse('course-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['title'], 'Dragon Basics')


class LessonRegistrationTests(APITestCase):
    def setUp(self):
        User = get_user_model()
        self.student = User.objects.create_user('student@example.com', 'student@example.com', 'password123')
        self.instructor = User.objects.create_user('instructor@example.com', 'instructor@example.com', 'password123')
        self.course = models.Course.objects.create(
            title='Advanced Dragon',
            slug='advanced-dragon',
            description='Advanced topics',
            price='2500.00',
        )
        start = timezone.now()
        self.lesson = models.Lesson.objects.create(
            course=self.course,
            start=start,
            end=start + timezone.timedelta(hours=2),
            location='Main Hall',
            instructor=self.instructor,
            capacity=15,
        )

    def test_register_requires_authentication(self):
        url = reverse('lesson-register', args=[self.lesson.pk])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_register_as_student(self):
        self.client.force_authenticate(user=self.student)
        url = reverse('lesson-register', args=[self.lesson.pk])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.Registration.objects.count(), 1)
