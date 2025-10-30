# Dragon Dance School Platform

Полноценная учебная платформа с бэкендом на Django и фронтендом на React для школы танца дракона.

## Возможности
- Каталог курсов с фильтрами и расписанием занятий.
- Интерактивная запись на уроки с JWT-аутентификацией.
- Блог и лента YouTube-видео.
- Контактная форма и опциональный магазин.
- Администрирование через Django Admin.

## Технологии
- **Backend:** Django REST Framework, PostgreSQL, JWT, CORS.
- **Frontend:** React + Vite + TailwindCSS.
- **Инфраструктура:** Docker, docker-compose, готовность к CI/CD.

## Запуск в Docker
```bash
docker-compose up --build
```
Сервис будет доступен по адресу <http://localhost:8000> (API) и <http://localhost:5173> (frontend).

## Переменные окружения
Шаблон находится в `infra/env.example`. Скопируйте файл в `.env` или `.env.dev` и обновите значения для production (секреты, домены, HTTPS и т.п.).

## Тесты
```bash
python backend/manage.py test
```

## Разработка фронтенда
```bash
cd frontend
npm install
npm run dev
```

## Структура репозитория
- `backend/` — проект Django с REST API.
- `frontend/` — SPA на React.
- `infra/` — конфигурация окружения и деплой.
- `docker-compose.yml`, `Dockerfile` — контейнеризация.
