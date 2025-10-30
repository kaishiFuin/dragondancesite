const testimonials = [
  {
    name: 'Марина Ли',
    role: 'Капитан команды «Лунный хвост»',
    quote:
      'За два месяца мы подготовили номер для городского фестиваля и заняли первое место. Тренеры помогли собрать команду и продумать каждую деталь шоу.',
  },
  {
    name: 'Иван Пак',
    role: 'Участник начинающей группы',
    quote:
      'Чёткое расписание, дружеская атмосфера и доступ к записям тренировок. Даже без опыта я быстро вошёл в ритм и почувствовал поддержку команды.',
  },
  {
    name: 'Алена Чэнь',
    role: 'Продюсер мероприятий',
    quote:
      'Мы регулярно заказываем выступления у школы. Управление расписанием, оплата и коммуникация полностью цифровые — экономия времени колоссальная.',
  },
];

export default function Testimonials() {
  return (
    <section className="space-y-8 rounded-3xl bg-slate-900 px-8 py-12 text-slate-100">
      <h2 className="text-3xl font-semibold">Отзывы команд</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className="space-y-4">
            <blockquote className="text-sm leading-relaxed text-slate-200">“{testimonial.quote}”</blockquote>
            <figcaption>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-xs uppercase tracking-wide text-slate-400">{testimonial.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
