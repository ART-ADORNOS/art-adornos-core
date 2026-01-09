<div align="center">

# 🎨 ART-ADORNOS Core

### Backend Oficial de la Organización ART-ADORNOS

![Django](https://img.shields.io/badge/Django-5.1.1-092E20?style=for-the-badge&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/DRF-3.15.2-a30000?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

[![CI](https://github.com/ART-ADORNOS/art-adornos-core/workflows/Django%20CI/badge.svg)](https://github.com/ART-ADORNOS/art-adornos-core/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ART-ADORNOS_art-adornos-core&metric=alert_status)](https://sonarcloud.io/dashboard?id=ART-ADORNOS_art-adornos-core)

</div>

---

## 📌 Descripción

**ART-ADORNOS Core** es el backend oficial construido con **Django 5.1** y **Django REST Framework** que proporciona:

- 🔐 Autenticación JWT
- 🔌 API REST para gestión de productos y startups
- 💾 Persistencia con PostgreSQL
- 🚀 CI/CD con GitHub Actions
- 🐳 Despliegue con Docker

---

## 🛠️ Tecnologías

| Categoría         | Tecnología                          | Versión |
|-------------------|-------------------------------------|---------|
| **Lenguaje**      | Python                              | 3.12+   |
| **Framework**     | Django                              | 5.1.1   |
| **API REST**      | Django REST Framework               | 3.15.2  |
| **Base de Datos** | PostgreSQL                          | 15      |
| **Autenticación** | JWT (djangorestframework-simplejwt) | 5.4.0   |
| **CORS**          | django-cors-headers                 | 4.4.0   |
| **Imágenes**      | Pillow                              | 11.2.1  |
| **Testing**       | Coverage                            | 7.8.2   |

---

## 📋 Prerrequisitos

### Para WSL (Ubuntu/Linux)

- Python 3.12 o superior
- PostgreSQL 15
- pip y venv
- git

### Para Windows

- Python 3.12 o superior → [Descargar](https://www.python.org/downloads/)
- PostgreSQL 15 → [Descargar](https://www.postgresql.org/download/windows/)
- Git for Windows → [Descargar](https://git-scm.com/download/win)

> ⚠️ **Al instalar Python en Windows:** Marca la opción "Add Python to PATH"

---

## 🚀 Instalación y Configuración

### 📦 Opción 1: WSL / Linux

#### 1. Clonar el repositorio

```bash
git clone https://github.com/ART-ADORNOS/art-adornos-core.git
cd art-adornos-core
```

#### 2. Crear entorno virtual

```bash
python3 -m venv venv
source venv/bin/activate
```

#### 3. Instalar dependencias

```bash
pip install --upgrade pip
pip install -r requirements/production.txt
```

#### 4. Configurar PostgreSQL

```bash
# Instalar PostgreSQL (si no lo tienes)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Acceder a PostgreSQL
sudo -u postgres psql

# Crear base de datos y usuario
CREATE DATABASE art_adornos_db;
CREATE USER art_user WITH PASSWORD 'tu_password';
ALTER ROLE art_user SET client_encoding TO 'utf8';
ALTER ROLE art_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE art_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE art_adornos_db TO art_user;
\q
```

#### 5. Configurar variables de entorno

```bash
cp .env.sample .env
nano .env  # o usa vim, code, etc. 
```

Edita el archivo `.env` con tus datos:

```env
SECRET_KEY=tu-secret-key-aqui
DEBUG=1
PSQL=1

DB_NAME=art_adornos_db
DB_USER=art_user
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_SCHEMA=public

PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=admin
```

> 💡 **Generar SECRET_KEY:**
> ```bash
> python -c 'from django.core. management.utils import get_random_secret_key; print(get_random_secret_key())'
> ```

#### 6. Ejecutar migraciones

```bash
python manage.py migrate
```

#### 7. Crear superusuario (opcional)

```bash
python manage.py createsuperuser
```

#### 8. Ejecutar el servidor

```bash
python manage.py runserver
```

✅ El servidor estará disponible en: `http://localhost:8000`

---

### 🪟 Opción 2: Windows (Python Nativo)

#### 1. Clonar el repositorio

Abre **PowerShell** o **CMD** y ejecuta:

```cmd
git clone https://github.com/ART-ADORNOS/art-adornos-core.git
cd art-adornos-core
```

#### 2. Crear entorno virtual

```cmd
python -m venv venv
venv\Scripts\activate
```

> 💡 Si aparece un error de permisos en PowerShell, ejecuta:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

#### 3. Instalar dependencias

```cmd
python -m pip install --upgrade pip
pip install -r requirements/production. txt
```

#### 4. Configurar PostgreSQL

**Opción A: Usando pgAdmin (GUI)**

1. Abre **pgAdmin 4** (instalado con PostgreSQL)
2. Conéctate al servidor local
3. Click derecho en "Databases" → Create → Database
    - Database:  `art_adornos_db`
4. Click derecho en "Login/Group Roles" → Create → Login/Group Role
    - Name: `art_user`
    - Password (pestaña Definition): `tu_password`
    - Privileges (pestaña): Marcar "Can login?"
5. Click derecho en `art_adornos_db` → Properties → Security
    - Agregar privilegios a `art_user`

**Opción B: Usando SQL Shell (psql)**

1. Abre **SQL Shell (psql)** del menú inicio
2. Presiona Enter hasta llegar a "Password for user postgres"
3. Ingresa tu contraseña de PostgreSQL
4. Ejecuta:

```sql
CREATE
DATABASE art_adornos_db;
CREATE
USER art_user WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE
art_adornos_db TO art_user;
\q
```

#### 5. Configurar variables de entorno

```cmd
copy .env.sample .env
notepad .env
```

Edita el archivo `.env` con tus datos:

```env
SECRET_KEY=tu-secret-key-generada
DEBUG=1
PSQL=1

DB_NAME=art_adornos_db
DB_USER=art_user
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_SCHEMA=public

PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=admin
```

> 💡 **Generar SECRET_KEY en Windows:**
> ```cmd
> python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
> ```

#### 6. Ejecutar migraciones

```cmd
python manage.py migrate
```

#### 7. Crear superusuario (opcional)

```cmd
python manage.py createsuperuser
```

#### 8. Ejecutar el servidor

```cmd
python manage.py runserver
```

✅ El servidor estará disponible en: `http://localhost:8000`

#### 🔄 Para trabajar en el futuro

Cada vez que trabajes en el proyecto:

```cmd
cd art-adornos-core
venv\Scripts\activate
python manage.py runserver
```

---

### 🐳 Opción 3: Docker (Alternativa - Multiplataforma)

Si prefieres usar Docker para no instalar PostgreSQL localmente:

#### Para WSL/Linux:

```bash
# Instalar Docker (si no lo tienes)
curl -fsSL https://get.docker.com -o get-docker. sh
sudo sh get-docker. sh

# Iniciar servicios
docker-compose up -d

# Aplicar migraciones
docker-compose exec django python manage. py migrate

# Crear superusuario
docker-compose exec django python manage.py createsuperuser
```

#### Para Windows:

1. Descarga e instala [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Abre PowerShell o CMD en la carpeta del proyecto:

```cmd
docker-compose up -d
docker-compose exec django python manage.py migrate
docker-compose exec django python manage.py createsuperuser
```

✅ **Servicios disponibles:**

- Django API:  `http://localhost:8000`
- PostgreSQL: `localhost:5432`
- PgAdmin: `http://localhost:8080` (user: admin@admin.com, pass: admin)

---

## 🧪 Testing

### En WSL/Linux:

```bash
# Ejecutar todos los tests
python manage.py test

# Con cobertura
coverage run manage.py test
coverage report
coverage html  # Genera reporte en htmlcov/index.html
```

### En Windows:

```cmd
# Ejecutar todos los tests
python manage.py test

# Con cobertura
coverage run manage. py test
coverage report
coverage html
```

Abre el reporte:  `htmlcov\index.html`

---

## 📁 Estructura del Proyecto

```
art-adornos-core/
├── config/              # Configuración de Django
├── core/                # Aplicación principal
├── utils/               # Utilidades y helpers
├── requirements/        # Dependencias Python
│   ├── production.txt
│   └── development.txt
├── docker/              # Archivos Docker
├── .github/workflows/   # CI/CD con GitHub Actions
├── manage.py
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 🔧 Comandos Útiles

### Django (WSL/Linux)

```bash
# Crear nueva migración
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar shell de Django
python manage.py shell

# Colectar archivos estáticos
python manage. py collectstatic
```

### Django (Windows)

```cmd
REM Crear nueva migración
python manage.py makemigrations

REM Aplicar migraciones
python manage.py migrate

REM Crear superusuario
python manage.py createsuperuser

REM Ejecutar shell de Django
python manage.py shell

REM Colectar archivos estáticos
python manage.py collectstatic
```

### Docker

```bash
# Ver logs
docker-compose logs -f django

# Reiniciar servicios
docker-compose restart

# Detener servicios
docker-compose down

# Rebuild
docker-compose up --build
```

---

## 🌐 Endpoints Principales

| Método | Endpoint              | Descripción               |
|--------|-----------------------|---------------------------|
| POST   | `/api/auth/login/`    | Login (obtener token JWT) |
| POST   | `/api/auth/register/` | Registro de usuario       |
| GET    | `/api/products/`      | Listar productos          |
| POST   | `/api/products/`      | Crear producto            |
| GET    | `/api/startups/`      | Listar startups           |
| GET    | `/admin/`             | Panel de administración   |

📖 **Documentación completa de API:** `http://localhost:8000/api/docs/`

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama:  `git checkout -b feature/nueva-funcionalidad`
3. Commit:  `git commit -m 'Add:  nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 👥 Equipo

Desarrollado con ❤️ por el equipo de **ART-ADORNOS**

<div align="center">

**[🌐 GitHub Organization](https://github.com/ART-ADORNOS)** | **[📧 Contacto](mailto:contact@art-adornos.com)**

</div>