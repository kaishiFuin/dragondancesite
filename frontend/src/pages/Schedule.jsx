import { useEffect, useState } from 'react';
import api from '../lib/api.js';

const fallbackLessons = [
  {
    id: 1,
    course_title: 'Базовая хореография дракона',
    start: new Date().toISOString(),
    location: 'Главный зал',
    capacity: 15,
    instructor: { first_name: 'Ли' },
  },
  {
    id: 2,
    course_title: 'Акробатика для выступлений',
    start: new Date(Date.now() + 86400000).toISOString(),
    location: 'Зал №2',
    capacity: 12,
    instructor: { first_name: 'Чэнь' },
  },
];

export default function SchedulePage() {
  const [lessons, setLessons] = useState(fallbackLessons);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('loading');
    api
      .get('lessons/?ordering=start&page_size=50')
      .then((response) => {
        setLessons(response.data.results ?? []);
        setStatus('success');
      })
      .catch(() => {
        setLessons(fallbackLessons);
        setStatus('error');
      });
  }, []);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-slate-900">Расписание</h1>
        <p className="max-w-2xl text-slate-600">
          Выбирайте удобную дату и записывайтесь онлайн. Свободные места отображаются автоматически.
        </p>
      </header>

      {status === 'loading' && <p className="text-slate-500">Загружаем расписание...</p>}
      {status === 'error' && (
        <p className="text-red-500">Не удалось загрузить расписание с сервера. Показано демо-расписание.</p>
      )}

      <section className="grid gap-6 md:grid-cols-2">
        {lessons.map((lesson) => (
          <article key={lesson.id} className="card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{lesson.course_title ?? 'Занятие'}</h2>
                <p className="text-sm text-slate-500">{new Date(lesson.start).toLocaleString('ru-RU')}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {lesson.location}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Тренер: {lesson.instructor?.first_name || 'Уточняется'}</span>
              <span>Мест: {lesson.capacity}</span>
            </div>
            <button type="button" className="btn-primary w-full">Записаться</button>
          </article>
        ))}
        {lessons.length === 0 && status === 'success' && (
          <p className="text-slate-500">Пока нет запланированных занятий. Подпишитесь на новости, чтобы узнать первыми.</p>
        )}
      </section>
    </div>
  );
}
