FROM python:3.11-slim

# Variables base
ARG ENV=production
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    APP_HOME=/app \
    ENV=${ENV}

WORKDIR $APP_HOME

# Dependencias del sistema (ROOT requerido)
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Crear usuario no root
RUN addgroup --system app && adduser --system --ingroup app app

# Copiar dependencias Python
COPY requirements/production.txt ./requirements/production.txt
RUN pip install --upgrade pip setuptools wheel \
    && pip install --no-cache-dir -r requirements/production.txt

# Copiar código
COPY . .

# Archivos estáticos
RUN python manage.py collectstatic --noinput --clear || true

# Cambiar a usuario no root (RUNTIME)
USER app

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000')" || exit 1

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "--timeout", "120", "config.wsgi:application"]
