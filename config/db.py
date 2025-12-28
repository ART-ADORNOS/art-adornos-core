import os.path
from pathlib import Path

import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Initialize environment variables

env = environ.Env()

environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

SQLITE = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# psycopg2-binary

POSTGRESQL = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),  # docker ? 'name_service(postgres)' : 'localhost'
        'PORT': env('DB_PORT'),
        'ATOMIC_REQUESTS': True,
        'OPTIONS': {
            'options': f'-c search_path={env("DB_SCHEMA")}'
        }
    }
}

# mysqlclient

MYSQL = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
    }
}

# django-mssql-backend - sql_server
# django mssql-django - mssql

SQLSERVER = {
    'default': {
        'ENGINE': 'sql_server.pyodbc',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),  # `1433` by default
        'OPTIONS': {
            'driver': 'SQL Server Native Client 10.0',
        },
    },
}
