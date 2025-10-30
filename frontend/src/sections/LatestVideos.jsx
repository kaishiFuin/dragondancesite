import { useEffect, useState } from 'react';
import api from '../lib/api.js';

const fallbackVideos = [
  {
    id: 1,
    title: 'Праздничный парад 2024',
    youtube_id: 'dQw4w9WgXcQ',
    description: 'Наше выступление на зимнем фестивале в центре города.',
  },
  {
    id: 2,
    title: 'Тренировка команды «Огненный ветер»',
    youtube_id: 'iik25wqIuFo',
    description: 'Закулисье подготовки к чемпионату.',
  },
];

export default function LatestVideos() {
  const [videos, setVideos] = useState(fallbackVideos);

  useEffect(() => {
    api
      .get('videos/?ordering=-published_at&page_size=4')
      .then((response) => {
        if (response.data?.results?.length) {
          setVideos(response.data.results);
        }
      })
      .catch(() => setVideos(fallbackVideos));
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Последние видео</h2>
          <p className="text-slate-500">Следите за новостями команды и вдохновляйтесь нашими выступлениями.</p>
        </div>
        <a
          href="https://www.youtube.com/@dragondance"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >
          YouTube канал
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {videos.map((video) => (
          <article key={video.id} className="card space-y-4">
            <div className="aspect-video overflow-hidden rounded-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtube_id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">{video.title}</h3>
            <p className="text-sm text-slate-600">{video.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
