import { useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  NewspaperIcon,
  PhoneIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import HomePage from './pages/Home.jsx';
import CoursesPage from './pages/Courses.jsx';
import SchedulePage from './pages/Schedule.jsx';
import BlogPage from './pages/Blog.jsx';
import ContactPage from './pages/Contact.jsx';
import ShopPage from './pages/Shop.jsx';

const navigation = [
  { name: 'Главная', to: '/', icon: AcademicCapIcon },
  { name: 'Курсы', to: '/courses', icon: AcademicCapIcon },
  { name: 'Расписание', to: '/schedule', icon: CalendarDaysIcon },
  { name: 'Блог', to: '/blog', icon: NewspaperIcon },
  { name: 'Контакты', to: '/contact', icon: PhoneIcon },
  { name: 'Магазин', to: '/shop', icon: ShoppingBagIcon },
];

const NavButton = ({ item, onClick }) => (
  <NavLink
    to={item.to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
        isActive ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
      }`
    }
  >
    <item.icon className="h-5 w-5" />
    {item.name}
  </NavLink>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 text-lg font-bold text-slate-900">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              DD
            </span>
            Dragon Dance School
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navigation.map((item) => (
              <NavButton key={item.to} item={item} />
            ))}
          </nav>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-700 md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <NavButton key={item.to} item={item} onClick={() => setMobileMenuOpen(false)} />
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </main>

      <footer className="bg-slate-900 py-12 text-slate-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">Dragon Dance School</p>
            <p className="text-sm text-slate-400">© {new Date().getFullYear()} Все права защищены.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white">
              YouTube
            </a>
            <a href="https://t.me" target="_blank" rel="noreferrer" className="hover:text-white">
              Telegram
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
