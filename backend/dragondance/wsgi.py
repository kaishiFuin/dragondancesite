"""WSGI config for Dragon Dance Academy project."""
from __future__ import annotations

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dragondance.settings")

application = get_wsgi_application()
