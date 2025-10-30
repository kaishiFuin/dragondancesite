import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import { useApi } from "../api/hooks";
import { BlogPost, Course, Video } from "../types";

export default function HomePage() {
  const { data: courses } = useApi<Course[]>("/courses", { limit: 3 });
  const { data: posts } = useApi<BlogPost[]>("/posts", { featured: true, limit: 2 });
  const { data: videos } = useApi<Video[]>("/videos", { limit: 3 });

  return (
    <div className="space-y-16">
      <Hero />

      <section>
        <SectionHeader title="Популярные курсы" description="Подборка направлений, которые выбирают чаще всего">
          <Link to="/courses" className="text-sm font-semibold text-brand-accent hover:underline">
            Все курсы
          </Link>
        </SectionHeader>
        {courses ? (
          courses.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {courses.map((course) => (
                <article key={course.id} className="rounded-2xl bg-white p-6 shadow">
                  <h3 className="text-lg font-semibold text-brand">{course.name}</h3>
                  <p className="mt-2 text-sm text-brand/70">
                    {course.description.length > 140
                      ? `${course.description.slice(0, 140)}...`
                      : course.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-brand">
                    Преподаватель: {course.instructor?.first_name} {course.instructor?.last_name}
                  </p>
                  <p className="mt-2 text-lg font-bold text-brand">{course.price} ₽</p>
                  <Link
                    to={`/courses#${course.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-brand-accent hover:underline"
                  >
                    Подробнее
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brand/60">Курсы появятся совсем скоро.</p>
          )
        ) : (
          <p className="text-sm text-brand/60">Загрузка курсов...</p>
        )}
      </section>

      <section>
        <SectionHeader title="Свежие новости" description="Анонсы мастер-классов и события школы" />
        {posts ? (
          posts.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <article key={post.id} className="rounded-2xl bg-white p-6 shadow">
                  <span className="text-xs uppercase tracking-wide text-brand-accent">Новость</span>
                  <h3 className="mt-2 text-lg font-semibold text-brand">{post.title}</h3>
                  <p className="mt-2 text-sm text-brand/70">
                    {post.content.length > 200 ? `${post.content.slice(0, 200)}...` : post.content}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-brand-accent hover:underline"
                  >
                    Читать
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brand/60">Новости скоро появятся.</p>
          )
        ) : (
          <p className="text-sm text-brand/60">Загрузка новостей...</p>
        )}
      </section>

      <section>
        <SectionHeader title="Новые видео" description="Смотрите выступления и уроки на YouTube" />
        {videos ? (
          videos.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {videos.map((video) => (
                <article key={video.id} className="overflow-hidden rounded-2xl bg-white shadow">
                  <img src={video.thumbnail_url} alt={video.title} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-brand">{video.title}</h3>
                    <p className="mt-2 text-xs text-brand/70">
                      {video.description.length > 150 ? `${video.description.slice(0, 150)}...` : video.description}
                    </p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-xs font-semibold text-brand-accent hover:underline"
                    >
                      Смотреть на YouTube
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brand/60">Видео появятся в ближайшее время.</p>
          )
        ) : (
          <p className="text-sm text-brand/60">Загрузка видео...</p>
        )}
      </section>
    </div>
  );
}
