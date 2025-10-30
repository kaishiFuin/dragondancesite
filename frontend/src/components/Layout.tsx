import { Fragment, PropsWithChildren } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

const navigation = [
  { name: "Главная", to: "/" },
  { name: "Курсы", to: "/courses" },
  { name: "Расписание", to: "/schedule" },
  { name: "Блог", to: "/blog" },
  { name: "Контакты", to: "/contact" },
  { name: "Магазин", to: "/shop" }
];

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-brand-soft">
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/" className="text-xl font-bold text-brand">
                      Dragon Dance
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          clsx(
                            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                            isActive
                              ? "border-brand-accent text-brand"
                              : "border-transparent text-brand/70 hover:border-brand-accent hover:text-brand"
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-md border border-transparent bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
                  >
                    YouTube-канал
                  </a>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-brand hover:bg-brand-soft hover:text-brand focus:outline-none">
                    <span className="sr-only">Открыть меню</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="space-y-1 pb-3 pt-2 sm:hidden">
                {navigation.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      clsx(
                        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
                        isActive
                          ? "border-brand-accent bg-brand-soft text-brand"
                          : "border-transparent text-brand hover:border-brand-accent hover:bg-brand-soft"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>

      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-brand/70">© {new Date().getFullYear()} Dragon Dance Academy</p>
            <div className="flex gap-4 text-sm">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-accent">
                Instagram
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer" className="hover:text-brand-accent">
                Telegram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-brand-accent">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
