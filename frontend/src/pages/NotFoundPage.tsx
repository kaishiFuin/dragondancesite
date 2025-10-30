import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-4xl font-bold text-brand">404</h1>
      <p className="mt-2 text-brand/70">Страница не найдена. Возможно, она была перемещена или удалена.</p>
      <Link to="/" className="mt-4 inline-flex rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-500">
        На главную
      </Link>
    </div>
  );
}
