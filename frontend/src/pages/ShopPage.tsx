import SectionHeader from "../components/SectionHeader";

const items = [
  {
    title: "Подарочный сертификат",
    description: "Подарите друзьям и близким возможность заниматься танцами.",
    price: "5000",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Мерч Dragon Dance",
    description: "Футболки и худи для тренировок и выступлений.",
    price: "3200",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Онлайн-курс Stretching",
    description: "Доступ к видеоурокам по растяжке на 3 месяца.",
    price: "2400",
    image:
      "https://images.unsplash.com/photo-1526404802757-ff1f3f77ad31?auto=format&fit=crop&w=600&q=80"
  }
];

export default function ShopPage() {
  return (
    <div className="space-y-10">
      <SectionHeader title="Магазин" description="Курсы и аксессуары для танцоров" />

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-2xl bg-white shadow">
            <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-brand">{item.title}</h3>
              <p className="mt-2 text-sm text-brand/70">{item.description}</p>
              <p className="mt-4 text-xl font-bold text-brand">{item.price} ₽</p>
              <button className="mt-4 rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-500">
                В корзину
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
