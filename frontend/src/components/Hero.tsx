import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="rounded-3xl bg-white p-10 shadow-lg">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-brand sm:text-4xl">
            Dragon Dance Academy — школа танцев будущего
          </h1>
          <p className="mt-4 text-lg text-brand/70">
            Освойте современные танцевальные направления вместе с преподавателями мирового уровня.
            Онлайн и офлайн занятия, актуальные новости и прямые трансляции с наших выступлений.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/courses"
              className="rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-white shadow hover:bg-orange-500"
            >
              Выбрать курс
            </Link>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-brand px-5 py-3 text-sm font-semibold text-brand hover:border-brand-accent hover:text-brand-accent"
            >
              Смотреть последние видео
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1487956382158-bb926046304a?auto=format&fit=crop&w=900&q=80"
            alt="Танцоры"
            className="h-80 w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
