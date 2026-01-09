import os
from pathlib import Path

import environ

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

DB_ENGINE = env('DB_ENGINE', default='sqlite').lower()


def sqlite_config():
    return {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }


def postgres_config():
    return {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': env('DB_NAME'),
            'USER': env('DB_USER'),
            'PASSWORD': env('DB_PASSWORD'),
            'HOST': env('DB_HOST'),
            'PORT': env('DB_PORT', default='5432'),
            'ATOMIC_REQUESTS': True,
            'OPTIONS': {
                'options': f'-c search_path={env("DB_SCHEMA", default="public")}'
            }
        }
    }


def mysql_config():
    return {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': env('DB_NAME'),
            'USER': env('DB_USER'),
            'PASSWORD': env('DB_PASSWORD'),
            'HOST': env('DB_HOST'),
            'PORT': env('DB_PORT', default='3306'),
            'OPTIONS': {
                'charset': 'utf8mb4',
            }
        }
    }


def sqlserver_config():
    return {
        'default': {
            'ENGINE': 'sql_server.pyodbc',
            'NAME': env('DB_NAME'),
            'USER': env('DB_USER'),
            'PASSWORD': env('DB_PASSWORD'),
            'HOST': env('DB_HOST'),
            'PORT': env('DB_PORT', default='1433'),
            'OPTIONS': {
                'driver': 'ODBC Driver 17 for SQL Server',
            },
        }
    }


DATABASE_ENGINES = {
    'sqlite': sqlite_config,
    'postgres': postgres_config,
    'mysql': mysql_config,
    'sqlserver': sqlserver_config,
}

if DB_ENGINE not in DATABASE_ENGINES:
    raise ValueError(
        f"DB_ENGINE inválido '{DB_ENGINE}'. "
        f"Valores permitidos: {', '.join(DATABASE_ENGINES.keys())}"
    )

DATABASES = DATABASE_ENGINES[DB_ENGINE]()
