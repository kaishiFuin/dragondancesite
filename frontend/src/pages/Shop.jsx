const products = [
  {
    id: 1,
    title: 'Комплект барабанов для тренировок',
    price: '18000',
    description: 'Профессиональные барабаны среднего размера с креплениями и ремнями.',
  },
  {
    id: 2,
    title: 'Костюм дракона (командный)',
    price: '95000',
    description: 'Лёгкий и прочный костюм для команды из 9 человек, включает чехол для хранения.',
  },
  {
    id: 3,
    title: 'Онлайн-курс «Музыка для выступлений»',
    price: '12000',
    description: 'Шестинедельная программа по созданию и микшированию треков под выступления.',
  },
];

export default function ShopPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-slate-900">Магазин</h1>
        <p className="max-w-3xl text-slate-600">
          Оборудование, костюмы и цифровые курсы для команд и организаторов мероприятий. Оплата доступна через Stripe и PayPal (интеграция в процессе).
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="card space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">{product.title}</h2>
            <p className="text-sm text-slate-600">{product.description}</p>
            <p className="text-lg font-semibold text-slate-900">{Number(product.price).toLocaleString('ru-RU')} ₽</p>
            <button type="button" className="btn-secondary w-full">
              Добавить в корзину
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
