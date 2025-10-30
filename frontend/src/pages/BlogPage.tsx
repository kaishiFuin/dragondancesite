import { Link } from "react-router-dom";
import { useApi } from "../api/hooks";
import { BlogPost } from "../types";
import SectionHeader from "../components/SectionHeader";

export default function BlogPage() {
  const { data: posts, loading } = useApi<BlogPost[]>("/posts");

  return (
    <div className="space-y-10">
      <SectionHeader title="Новости и блог" description="Будьте в курсе событий академии" />

      {loading && <p className="text-sm text-brand/60">Загрузка новостей...</p>}

      {posts && posts.length === 0 ? (
        <p className="text-sm text-brand/60">Пока нет опубликованных новостей.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts?.map((post) => (
            <article key={post.id} className="rounded-2xl bg-white p-6 shadow">
              <h3 className="text-xl font-semibold text-brand">{post.title}</h3>
              <p className="mt-2 text-sm text-brand/60">
                {new Date(post.published_at).toLocaleDateString("ru-RU")}
              </p>
              <p className="mt-4 text-sm text-brand/70">
                {post.content.length > 260 ? `${post.content.slice(0, 260)}...` : post.content}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-brand-accent hover:underline"
              >
                Читать полностью
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
