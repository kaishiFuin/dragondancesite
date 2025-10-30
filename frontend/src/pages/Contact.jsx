import { useState } from 'react';
import api from '../lib/api.js';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('loading');
    api
      .post('contacts/', form)
      .then(() => {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      })
      .catch(() => setStatus('error'));
  };

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-slate-900">Контакты</h1>
        <p className="max-w-3xl text-slate-600">
          Свяжитесь с нами, чтобы заказать выступление, получить консультацию по курсам или обсудить индивидуальную программу.
        </p>
      </header>

      <section className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <div className="card space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">Адрес</h2>
            <p className="text-sm text-slate-600">Москва, Красная Пресня, 12</p>
            <p className="text-sm text-slate-600">Телефон: +7 (495) 123-45-67</p>
            <p className="text-sm text-slate-600">Email: hello@dragondance.school</p>
          </div>
          <iframe
            title="Dragon Dance School Map"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A3d3df0e1385ef1848793d704e0c1a2647ccbe06e0f70e86c4bd3933585d8ce28&source=constructor"
            width="100%"
            height="320"
            allowFullScreen
            className="rounded-3xl border border-slate-100 shadow"
          />
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Написать нам</h2>
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="rounded-full border border-slate-200 px-5 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="rounded-full border border-slate-200 px-5 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <textarea
            name="message"
            placeholder="Ваше сообщение"
            required
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            rows="5"
            className="rounded-3xl border border-slate-200 px-5 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button type="submit" className="btn-primary w-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Отправляем...' : 'Отправить'}
          </button>
          {status === 'success' && <p className="text-sm text-green-600">Сообщение отправлено. Мы ответим в ближайшее время.</p>}
          {status === 'error' && <p className="text-sm text-red-500">Произошла ошибка. Попробуйте ещё раз.</p>}
        </form>
      </section>
    </div>
  );
}
