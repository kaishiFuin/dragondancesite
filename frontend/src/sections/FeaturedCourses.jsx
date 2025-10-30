import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';

const fallbackCourses = [
  {
    id: 1,
    title: 'Базовая хореография дракона',
    slug: 'dragon-basics',
    description: 'Освойте движения хвоста и головы, работу в команде и базовые элементы шоу.',
    level: 'beginner',
    price: '15000.00',
  },
  {
    id: 2,
    title: 'Акробатика для выступлений',
    slug: 'performance-acro',
    description: 'Прыжки, поддержки и синхронные трюки для ярких фестивалей.',
    level: 'intermediate',
    price: '22000.00',
  },
  {
    id: 3,
    title: 'Создание авторского номера',
    slug: 'creative-show',
    description: 'От идеи до постановки: разработка уникальной программы с наставником.',
    level: 'advanced',
    price: '35000.00',
  },
];

const levelLabels = {
  beginner: 'Новички',
  intermediate: 'Продвинутые',
  advanced: 'Профи',
};

export default function FeaturedCourses() {
  const [courses, setCourses] = useState(fallbackCourses);

  useEffect(() => {
    api
      .get('courses/?ordering=title&page_size=3')
      .then((response) => {
        if (response.data?.results?.length) {
          setCourses(response.data.results);
        }
      })
      .catch(() => setCourses(fallbackCourses));
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Популярные курсы</h2>
          <p className="text-slate-500">Выберите программу по уровню подготовки и целям команды.</p>
        </div>
        <Link to="/courses" className="btn-primary">
          Все курсы
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {courses.map((course) => (
          <article key={course.id} className="card flex flex-col gap-4">
            <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {levelLabels[course.level] ?? 'Курс'}
            </span>
            <h3 className="text-xl font-semibold text-slate-900">{course.title}</h3>
            <p className="text-sm text-slate-600 line-clamp-4">{course.description}</p>
            {course.price && (
              <p className="text-lg font-semibold text-slate-900">от {Number(course.price).toLocaleString('ru-RU')} ₽</p>
            )}
            <Link to={`/courses?selected=${course.slug ?? course.id}`} className="btn-secondary w-fit">
              Подробнее
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
