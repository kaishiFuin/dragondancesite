import { Link } from 'react-router-dom';
import FeaturedCourses from '../sections/FeaturedCourses.jsx';
import LatestVideos from '../sections/LatestVideos.jsx';
import Testimonials from '../sections/Testimonials.jsx';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 rounded-3xl bg-white/90 px-6 py-16 shadow-xl ring-1 ring-slate-100 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-primary">
            Школа китайского танца дракона
          </p>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Твоя команда, твой ритм, твой триумф.
          </h1>
          <p className="text-lg text-slate-600">
            Погрузитесь в искусство танца дракона с опытными наставниками, гибким расписанием и яркой командой единомышленников.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/courses" className="btn-primary">
              Выбрать курс
            </Link>
            <Link to="/schedule" className="btn-secondary">
              Записаться на урок
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-primary/10 blur-3xl" aria-hidden="true" />
          <img
            src="https://images.unsplash.com/photo-1529429617124-aeea66b5ed9b?auto=format&fit=crop&w=1200&q=80"
            alt="Dragon dance"
            className="relative w-full rounded-3xl object-cover shadow-xl"
            loading="lazy"
          />
        </div>
      </section>

      <FeaturedCourses />
      <LatestVideos />
      <Testimonials />
    </div>
  );
}
