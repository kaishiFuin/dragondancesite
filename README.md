# Dragon Dance Academy Platform

Полноценная платформа для школы танцев Dragon Dance Academy, включающая современный фронтенд на React и backend на Django.

## Стек

- **Backend**: Django + Django REST Framework, JWT-аутентификация, CORS.
- **Frontend**: React + Vite + TailwindCSS, адаптивный минималистичный дизайн.
- **База данных**: PostgreSQL (подключение через `DATABASE_URL`).
- **CI/CD**: готово к контейнеризации и деплою (Dockerfile может быть добавлен дополнительно).

## Структура

```
backend/   # Django проект с REST API, моделями, админкой и тестами
frontend/  # Vite + React SPA с основными страницами платформы
```

## Быстрый старт

1. Настройте backend:

   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   cp .env.example .env
   python manage.py migrate
   python manage.py runserver
   ```

2. Запустите frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Возможности

- Главная страница с героями, карточками курсов, новостями и видео.
- Каталог курсов с фильтрами по стоимости и поиском.
- Интерактивное расписание и система записи на занятия.
- Блог с новостями и подборкой видео с YouTube.
- Контактная страница с формой обратной связи, картой и контактами.
- Магазин с курсами и мерчем (опционально, готов к подключению платежей).
- Django Admin для управления пользователями, курсами, уроками и контентом.
- API покрыт модульными тестами для ключевых сценариев.

## Локализация и SEO

- Интерфейс по умолчанию на русском языке, поддержка английского (на уровне Django).
- Семантические теги и мета-теги для улучшения SEO.

## Дальнейшие шаги

- Подключение YouTube API и платежных систем (Stripe/PayPal).
- Добавление Docker и CI/CD пайплайна.
- Расширение тестов и внедрение e2e-покрытия для фронтенда.
