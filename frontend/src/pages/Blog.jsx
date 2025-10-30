import { useEffect, useState } from 'react';
import api from '../lib/api.js';

const fallbackPosts = [
  {
    id: 1,
    title: 'Команда Dragon Dance победила на зимнем фестивале',
    content:
      'Наши ученики заняли первое место в номинации «Лучшее шоу» благодаря смелой хореографии и синхронной работе команды.',
    published_at: new Date().toISOString(),
    author: { first_name: 'Команда' },
  },
  {
    id: 2,
    title: 'Обновлённое расписание мастер-классов',
    content: 'Добавлены интенсивы по работе с барабанами и акробатике. Запись доступна через раздел «Расписание».',
    published_at: new Date(Date.now() - 86400000).toISOString(),
    author: { first_name: 'Администратор' },
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState(fallbackPosts);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('loading');
    api
      .get('posts/?ordering=-published_at&page_size=10')
      .then((response) => {
        setPosts(response.data.results ?? fallbackPosts);
        setStatus('success');
      })
      .catch(() => {
        setPosts(fallbackPosts);
        setStatus('error');
      });
  }, []);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-slate-900">Новости и блог</h1>
        <p className="max-w-3xl text-slate-600">
          Следите за успехами учеников, расписанием мероприятий и публикациями о технике танца дракона.
        </p>
      </header>

      {status === 'loading' && <p className="text-slate-500">Загружаем новости...</p>}
      {status === 'error' && <p className="text-red-500">Не удалось загрузить новости. Показаны свежие материалы из демо-набора.</p>}

      <section className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="card space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
              <span>{post.author?.first_name ?? 'Команда Dragon Dance'}</span>
              {post.published_at && <span>{new Date(post.published_at).toLocaleDateString('ru-RU')}</span>}
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">{post.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{post.content}</p>
          </article>
        ))}
        {posts.length === 0 && status === 'success' && (
          <p className="text-slate-500">Пока нет опубликованных материалов. Подписывайтесь на YouTube, чтобы не пропустить новости.</p>
        )}
      </section>
    </div>
  );
}
