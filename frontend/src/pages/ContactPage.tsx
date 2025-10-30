import { FormEvent, useState } from "react";
import client from "../api/client";
import SectionHeader from "../components/SectionHeader";
import { ContactRequestInput } from "../types";

export default function ContactPage() {
  const [form, setForm] = useState<ContactRequestInput>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await client.post("/contact/", form);
      setStatus("Спасибо! Мы свяжемся с вами в ближайшее время.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Ошибка при отправке. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10">
      <SectionHeader title="Контакты" description="Напишите нам или приходите в гости" />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-brand">Связаться с нами</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand" htmlFor="name">
                Имя
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="mt-1 w-full rounded-md border border-brand-soft px-3 py-2 text-sm focus:border-brand-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="mt-1 w-full rounded-md border border-brand-soft px-3 py-2 text-sm focus:border-brand-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand" htmlFor="message">
                Сообщение
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                className="mt-1 w-full rounded-md border border-brand-soft px-3 py-2 text-sm focus:border-brand-accent focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-500 disabled:opacity-60"
            >
              {loading ? "Отправка..." : "Отправить"}
            </button>
            {status && <p className="text-sm text-brand/70">{status}</p>}
          </form>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-brand">Контактная информация</h3>
            <p className="mt-2 text-sm text-brand/70">г. Москва, ул. Танцевальная, 15</p>
            <p className="text-sm text-brand/70">Телефон: +7 (900) 123-45-67</p>
            <p className="text-sm text-brand/70">Email: hello@dragondance.academy</p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow">
            <iframe
              title="Dragon Dance Academy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.6180139268756!2d30.314130877284893!3d59.93895548187667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46963111c4e4ef9f%3A0x8c8c8efdc7cb6805!2sPalace%20Square!5e0!3m2!1sru!2sru!4v1700000000000!5m2!1sru!2sru"
              width="100%"
              height="300"
              loading="lazy"
              className="border-0"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
