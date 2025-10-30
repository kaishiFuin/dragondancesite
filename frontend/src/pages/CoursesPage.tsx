import { useMemo, useState } from "react";
import { useApi } from "../api/hooks";
import { Course } from "../types";
import SectionHeader from "../components/SectionHeader";

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [priceTo, setPriceTo] = useState<string>("");
  const { data: courses, loading } = useApi<Course[]>("/courses", {
    q: search || undefined,
    price_to: priceTo || undefined
  });

  const filteredCourses = useMemo(() => courses ?? [], [courses]);

  return (
    <div className="space-y-10">
      <SectionHeader title="Курсы" description="Выберите направление и зарегистрируйтесь" />

      <div className="rounded-2xl bg-white p-6 shadow">
        <form className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-brand" htmlFor="search">
              Поиск по названию
            </label>
            <input
              id="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Например, Contemporary"
              className="mt-1 w-full rounded-md border border-brand-soft px-3 py-2 text-sm focus:border-brand-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand" htmlFor="priceTo">
              Цена до (₽)
            </label>
            <input
              id="priceTo"
              type="number"
              min={0}
              value={priceTo}
              onChange={(event) => setPriceTo(event.target.value)}
              className="mt-1 w-full rounded-md border border-brand-soft px-3 py-2 text-sm focus:border-brand-accent focus:outline-none"
            />
          </div>
        </form>
      </div>

      {loading ? (
        <p className="text-sm text-brand/60">Загрузка курсов...</p>
      ) : filteredCourses.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCourses.map((course) => (
            <article key={course.id} id={course.slug} className="rounded-2xl bg-white p-6 shadow">
              <h3 className="text-xl font-semibold text-brand">{course.name}</h3>
              <p className="mt-2 text-sm text-brand/70">{course.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <span className="rounded-full bg-brand-soft px-3 py-1">{course.schedule}</span>
                <span>Стоимость: {course.price} ₽</span>
              </div>
              <button className="mt-6 rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-500">
                Записаться
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-sm text-brand/60">По вашему запросу курсов не найдено.</p>
      )}
    </div>
  );
}
