import { useApi } from "../api/hooks";
import { Lesson } from "../types";
import SectionHeader from "../components/SectionHeader";

export default function SchedulePage() {
  const { data: lessons, loading, error } = useApi<Lesson[]>("/lessons", { upcoming: true });

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Расписание"
        description="Запишитесь на ближайшие занятия в один клик"
      />

      {loading && <p className="text-sm text-brand/60">Загрузка расписания...</p>}
      {error && <p className="text-sm text-red-500">Не удалось загрузить расписание: {error}</p>}

      <div className="space-y-4">
        {lessons?.map((lesson) => (
          <article
            key={lesson.id}
            className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-brand">
                {lesson.course.name} — {lesson.title}
              </h3>
              <p className="text-sm text-brand/70">{new Date(lesson.start_at).toLocaleString("ru-RU")}</p>
              <p className="text-sm text-brand/70">
                Преподаватель: {lesson.teacher?.first_name} {lesson.teacher?.last_name}
              </p>
              <p className="text-sm text-brand/70">Локация: {lesson.location}</p>
            </div>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold">
                Свободно мест: {lesson.seats_left}
              </span>
              <button className="rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-500">
                Записаться
              </button>
            </div>
          </article>
        ))}
        {!loading && lessons && lessons.length === 0 ? (
          <p className="text-sm text-brand/60">Пока нет занятий для записи. Загляните позже!</p>
        ) : null}
      </div>
    </div>
  );
}
