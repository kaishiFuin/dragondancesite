# Dragon Dance Academy Backend

This directory contains the Django REST API powering the Dragon Dance Academy platform.

## Quick start

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

The API is available at `http://localhost:8000/api/`. JWT authentication endpoints are exposed at `/api/token/` and `/api/token/refresh/`.

Run the automated test-suite with:

```bash
python manage.py test
```
