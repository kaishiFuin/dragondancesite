import { useEffect, useMemo, useState } from 'react';
import api from '../lib/api.js';

const levelOptions = [
  { value: '', label: 'Все уровни' },
  { value: 'beginner', label: 'Новички' },
  { value: 'intermediate', label: 'Продвинутые' },
  { value: 'advanced', label: 'Профи' },
];

const levelLabelMap = levelOptions.reduce((acc, option) => {
  if (option.value) acc[option.value] = option.label;
  return acc;
}, {});

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    api
      .get('courses/?page_size=50')
      .then((response) => setCourses(response.data.results ?? []))
      .catch(() => setCourses([]));
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesLevel = level ? course.level === level : true;
      const matchesSearch = search
        ? course.title.toLowerCase().includes(search.toLowerCase()) ||
          course.description?.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesLevel && matchesSearch;
    });
  }, [courses, level, search]);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-slate-900">Курсы</h1>
        <p className="max-w-3xl text-slate-600">
          Выбирайте программу обучения по уровню и специализации: от базовой техники до постановки собственных фестивальных шоу.
        </p>
        <div className="grid gap-4 md:grid-cols-4">
          <input
            type="search"
            placeholder="Поиск курса"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="md:col-span-2 rounded-full border border-slate-200 px-5 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            className="rounded-full border border-slate-200 px-5 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {filteredCourses.map((course) => (
          <article key={course.id} className="card space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{course.title}</h2>
              <p className="mt-2 text-sm text-slate-500">
                Уровень:{' '}
                <span className="font-semibold uppercase tracking-wide">
                  {levelLabelMap[course.level] ?? course.level}
                </span>
              </p>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{course.description}</p>
            {course.lessons?.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Ближайшие занятия</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {course.lessons.slice(0, 3).map((lesson) => (
                    <li key={lesson.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2">
                      <span>{new Date(lesson.start).toLocaleString('ru-RU')}</span>
                      <span className="font-medium">{lesson.location}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
        {filteredCourses.length === 0 && (
          <p className="text-slate-500">Курсы не найдены. Попробуйте изменить фильтры.</p>
        )}
      </section>
    </div>
  );
}
