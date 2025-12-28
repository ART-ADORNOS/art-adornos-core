<div align="center">

# 🎨 ART-ADORNOS Core

### Backend Oficial de la Organización ART-ADORNOS

![Django](https://img.shields.io/badge/Django-5.1.1-092E20?style=for-the-badge&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/DRF-3.14-a30000?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

[![CI](https://github.com/ART-ADORNOS/art-adornos-core/workflows/Django%20CI/badge.svg)](https://github.com/ART-ADORNOS/art-adornos-core/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ART-ADORNOS_art-adornos-core&metric=alert_status)](https://sonarcloud.io/dashboard?id=ART-ADORNOS_art-adornos-core)
[![License:  MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Documentación](#-documentación) • [Instalación](#-instalación-y-ejecución) • [API](#-endpoints-principales) • [Contribuir](#-contribución)

</div>

---

## 📌 Descripción General

**ART-ADORNOS Core** es el backend oficial de la organización **ART-ADORNOS**, desarrollado con **Django 5.1** y **Django REST Framework**. Este repositorio es responsable de: 

- 🔐 **Autenticación y autorización** mediante JWT
- 🔌 **API REST centralizada** para todos los clientes
- 🧠 **Lógica de negocio** y validaciones
- 💾 **Persistencia y gestión de datos**
- 🛡️ **Seguridad y control de acceso**
- 🔗 **Integraciones futuras** con servicios externos

> **⚠️ Nota importante:** Este repositorio **NO incluye frontend**. El cliente web (React + TailwindCSS) se mantiene en un repositorio independiente, siguiendo las mejores prácticas de arquitectura desacoplada y microservicios.

---

## 🧩 Arquitectura General

```
ART-ADORNOS (GitHub Organization)
│
├── 🖥️  art-adornos-core        ← Backend (Django / DRF)    ← 📍 ESTE REPOSITORIO
│   ├── API REST
│   ├── Autenticación JWT
│   ├── Lógica de Negocio
│   └── Base de Datos
│
└── 🎨 art-adornos-frontend    ← Frontend (React / Tailwind)
    ├── Interfaz de Usuario
    ├── Componentes React
    └── Consumo de API
```

### 🎯 Responsabilidades del Backend

| Área | Descripción |
|------|-------------|
| **🔐 Autenticación** | Sistema JWT con tokens de acceso y refresco |
| **🌐 API REST** | Endpoints documentados y versionados |
| **💼 Lógica de Negocio** | Reglas, validaciones y procesos empresariales |
| **💾 Persistencia** | Gestión de base de datos PostgreSQL |
| **🔌 Integraciones** | Preparado para servicios de terceros |
| **🛡️ Seguridad** | Validaciones, permisos y protección CSRF |

---

## ✨ Características Principales

- 🔐 **Autenticación JWT completa** (login, registro, refresh tokens, logout)
- 🧑‍💼 **Sistema de usuarios y roles** con permisos granulares
- 📦 **Gestión de productos y catálogos** con operaciones CRUD
- 🏢 **Módulo de emprendimientos y startups**
- 🔌 **API RESTful totalmente desacoplada** del frontend
- 🧪 **Infraestructura de testing** automatizado
- 📊 **Análisis de calidad continuo** con SonarCloud
- 🐳 **Soporte para Docker** y contenedores
- 📈 **Arquitectura escalable** y preparada para microservicios
- 🔄 **CI/CD** con GitHub Actions

---

## ⚙️ Stack Tecnológico

<div align="center">

| 🎯 Capa | 🛠️ Tecnología | 📦 Versión |
|---------|---------------|-----------|
| **Backend Framework** | Django | 5.1.1 |
| **API** | Django REST Framework | 3.14+ |
| **Autenticación** | JWT (djangorestframework-simplejwt) | Latest |
| **Base de Datos** | PostgreSQL (producción) / SQLite (desarrollo) | 14+ / 3 |
| **Servidor WSGI** | Gunicorn | Latest |
| **Integración Continua** | GitHub Actions | - |
| **Análisis de Código** | SonarCloud | - |
| **Gestión de Dependencias** | pip + requirements. txt | - |
| **Entornos Soportados** | Linux, WSL, Windows, Docker | - |

</div>

---

## 🚀 Instalación y Ejecución

### 📋 Prerrequisitos

Antes de comenzar, asegúrese de contar con:

- ✅ **Python 3.11** o superior
- ✅ **Git** 2.x o superior
- ✅ **PostgreSQL 14+** (recomendado para producción)
- ✅ **pip** actualizado
- ✅ **virtualenv** o **pyenv** (recomendado)

---

### 🐧 Instalación en Linux / WSL

Esta sección utiliza **pyenv** para gestionar versiones de Python y **virtualenv** para aislar dependencias. 

#### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/ART-ADORNOS/art-adornos-core.git
cd art-adornos-core
```

#### 2️⃣ Instalar pyenv (si no está instalado)

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependencias necesarias
sudo apt install -y make build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev \
libffi-dev liblzma-dev git

# Instalar pyenv
curl https://pyenv.run | bash

# Configurar pyenv en el shell
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc

# Recargar configuración del shell
exec "$SHELL"
```

#### 3️⃣ Instalar Python con pyenv

```bash
# Instalar Python 3.11
pyenv install 3.11.0

# Establecer Python 3.11 como versión local del proyecto
pyenv local 3.11.0

# Verificar la instalación
python --version  # Debe mostrar:  Python 3.11.0
```

#### 4️⃣ Crear Entorno Virtual

```bash
# Instalar virtualenv
pip install virtualenv

# Crear entorno virtual en el proyecto
python -m venv venv

# Activar el entorno virtual
source venv/bin/activate
```

#### 5️⃣ Instalar Dependencias

```bash
# Actualizar pip
pip install --upgrade pip setuptools wheel

# Instalar dependencias de desarrollo
pip install -r requirements/development.txt
```

#### 6️⃣ Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.sample . env

# Editar el archivo . env
nano .env
```

**Configuración mínima para desarrollo:**

```env
SECRET_KEY=django-insecure-development-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3

# Para PostgreSQL (opcional en desarrollo):
# DATABASE_URL=postgresql://user:password@localhost:5432/art_adornos_db
```

#### 7️⃣ Ejecutar Migraciones y Crear Superusuario

```bash
# Aplicar migraciones de base de datos
python manage.py migrate

# Crear un superusuario para acceder al admin
python manage.py createsuperuser

# Recolectar archivos estáticos (opcional en desarrollo)
python manage.py collectstatic --noinput
```

#### 8️⃣ Iniciar el Servidor de Desarrollo

```bash
# Ejecutar servidor Django
python manage.py runserver
```

✅ **API disponible en:** [`http://127.0.0.1:8000/`](http://127.0.0.1:8000/)  
✅ **Panel de administración:** [`http://127.0.0.1:8000/admin/`](http://127.0.0.1:8000/admin/)

---

### 🪟 Instalación en Windows

Esta sección utiliza el módulo **venv** nativo de Python, ideal para Windows.

#### 1️⃣ Clonar el Repositorio

```cmd
git clone https://github.com/ART-ADORNOS/art-adornos-core.git
cd art-adornos-core
```

#### 2️⃣ Verificar Instalación de Python

```cmd
# Verificar versión de Python
python --version

# Si no está instalado, descargar desde: 
# https://www.python.org/downloads/
# ⚠️ IMPORTANTE: Marcar "Add Python to PATH" durante la instalación
```

#### 3️⃣ Crear Entorno Virtual

```cmd
# Crear entorno virtual con venv
python -m venv venv

# Activar el entorno virtual
venv\Scripts\activate
```

#### 4️⃣ Instalar Dependencias

```cmd
# Actualizar pip
python -m pip install --upgrade pip setuptools wheel

# Instalar dependencias de desarrollo
pip install -r requirements\development.txt
```

#### 5️⃣ Configurar Variables de Entorno

```cmd
# Copiar el archivo de ejemplo
copy .env.sample .env

# Editar con el Bloc de notas o tu editor preferido
notepad .env
```

**Configuración mínima para desarrollo en Windows:**

```env
SECRET_KEY=django-insecure-development-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

#### 6️⃣ Ejecutar Migraciones y Crear Superusuario

```cmd
# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Recolectar archivos estáticos (opcional)
python manage.py collectstatic --noinput
```

#### 7️⃣ Iniciar el Servidor de Desarrollo

```cmd
# Ejecutar servidor Django
python manage.py runserver
```

✅ **API disponible en:** [`http://127.0.0.1:8000/`](http://127.0.0.1:8000/)  
✅ **Panel de administración:** [`http://127.0.0.1:8000/admin/`](http://127.0.0.1:8000/admin/)

---

### 🐳 Instalación con Docker (Opcional)

```bash
# Construir la imagen
docker-compose build

# Iniciar los servicios
docker-compose up -d

# Ejecutar migraciones
docker-compose exec web python manage.py migrate

# Crear superusuario
docker-compose exec web python manage.py createsuperuser
```

---

## 🔗 Frontend (Repositorio Separado)

<div align="center">

### 🎨 El frontend React se encuentra en un repositorio independiente

👉 **[art-adornos-frontend](https://github.com/ART-ADORNOS/art-adornos-frontend)**

</div>

Este backend expone una **API REST completa** diseñada para ser consumida por:

- 🌐 **Aplicación web React**
- 📱 **Aplicaciones móviles** (iOS / Android)
- 🤖 **Integraciones de terceros**
- 🔌 **Futuros microservicios**

---

## 📡 Endpoints Principales

### 🔐 Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/auth/register/` | Registro de nuevos usuarios |
| `POST` | `/api/auth/login/` | Inicio de sesión (obtener tokens JWT) |
| `POST` | `/api/auth/refresh/` | Refrescar token de acceso |
| `POST` | `/api/auth/logout/` | Cerrar sesión |

### 👤 Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/users/me/` | Obtener perfil del usuario actual |
| `PUT` | `/api/users/me/` | Actualizar perfil |
| `DELETE` | `/api/users/me/` | Eliminar cuenta |

### 📦 Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/products/` | Listar productos |
| `POST` | `/api/products/` | Crear producto (vendedores) |
| `GET` | `/api/products/{id}/` | Detalle de producto |
| `PUT` | `/api/products/{id}/` | Actualizar producto |
| `DELETE` | `/api/products/{id}/` | Eliminar producto |

### 🏢 Startups

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/startups/` | Listar emprendimientos |
| `POST` | `/api/startups/` | Crear startup |
| `GET` | `/api/startups/{id}/` | Detalle de startup |
| `PUT` | `/api/startups/{id}/` | Actualizar startup |

> 📚 **Documentación completa de la API:** Disponible en `/api/docs/` (Swagger) y `/api/redoc/` (ReDoc)

---

## 🔄 CI/CD y Calidad de Código

### 🤖 GitHub Actions

El proyecto implementa pipelines automatizados para:

- ✅ **Testing automático** en cada push y PR
- ✅ **Linting y formato** de código (flake8, black)
- ✅ **Validación de seguridad** (bandit, safety)
- ✅ **Builds de Docker** automatizados
- ✅ **Despliegue continuo** (en configuración)

**Workflows configurados:**

```
. github/workflows/
├── django-ci. yml          # Tests y validaciones
├── sonarcloud.yml         # Análisis de calidad
└── docker-build.yml       # Build de imágenes
```

### 📊 SonarCloud

Análisis continuo de calidad del código monitoreando:

- 🐛 **Bugs y vulnerabilidades**
- 🧹 **Code smells** y deuda técnica
- 📈 **Cobertura de tests**
- 🔒 **Seguridad y hotspots**
- 📏 **Maintainability rating**

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ART-ADORNOS_art-adornos-core&metric=alert_status)](https://sonarcloud.io/dashboard?id=ART-ADORNOS_art-adornos-core)

---

## 🌐 Despliegue en Producción

### ☁️ Plataformas Compatibles

| Plataforma | Características | Recomendado para |
|------------|----------------|------------------|
| **AWS** | Escalabilidad máxima, servicios completos | Empresas y producción |
| **DigitalOcean** | Balance precio/rendimiento | Startups y proyectos medianos |
| **Heroku** | Despliegue rápido, PaaS | Prototipos y MVP |
| **Docker** | Portabilidad total | Cualquier infraestructura |
| **Railway/Render** | Alternativas modernas a Heroku | Proyectos pequeños |

### 🔐 Variables de Entorno en Producción

**Configuración mínima obligatoria:**

```env
# Django Core
SECRET_KEY=your-super-secret-production-key-min-50-chars
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Security
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True

# CORS (si el frontend está en otro dominio)
CORS_ALLOWED_ORIGINS=https://yourfrontend.com

# Optional: AWS S3 para archivos estáticos
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
```

### 📝 Checklist de Despliegue

- [ ] Configurar base de datos PostgreSQL
- [ ] Establecer `DEBUG=False`
- [ ] Configurar `SECRET_KEY` segura (>50 caracteres aleatorios)
- [ ] Definir `ALLOWED_HOSTS` correctamente
- [ ] Habilitar HTTPS y certificados SSL
- [ ] Configurar archivos estáticos (S3, CDN, etc.)
- [ ] Configurar logs y monitoreo
- [ ] Ejecutar `python manage.py check --deploy`
- [ ] Configurar backups automáticos de la base de datos
- [ ] Implementar rate limiting y protección DDoS

---

## 🧪 Testing

### Ejecutar Tests

```bash
# Ejecutar todos los tests
python manage.py test

# Tests con cobertura
coverage run --source='.' manage.py test
coverage report
coverage html  # Genera reporte HTML en htmlcov/

# Tests específicos
python manage.py test coreusers.tests
python manage.py test coreproducts.tests. test_api
```

### Estructura de Tests

```
Apps/
├── users/
│   └── tests/
│       ├── test_models.py
│       ├── test_api.py
│       └── test_auth.py
└── products/
    └── tests/
        ├── test_models.py
        └── test_api.py
```

---

## 🤝 Contribución

¡Sus contribuciones son bienvenidas! Para contribuir al proyecto:

### 📝 Proceso de Contribución

1. **Fork** del repositorio
2. **Clone** tu fork localmente
   ```bash
   git clone https://github.com/TU-USUARIO/art-adornos-core.git
   ```
3. **Crea una rama** para tu feature
   ```bash
   git checkout -b feature/nombre-descriptivo
   ```
4. **Realiza tus cambios** siguiendo las convenciones del proyecto
5. **Commits** siguiendo [Conventional Commits](https://www.conventionalcommits.org/)
   ```bash
   git commit -m "feat: añade endpoint de búsqueda de productos"
   git commit -m "fix: corrige validación de email en registro"
   git commit -m "docs: actualiza README con instrucciones de Docker"
   ```
6. **Push** a tu fork
   ```bash
   git push origin feature/nombre-descriptivo
   ```
7. **Abre un Pull Request** detallado explicando los cambios

### ✅ Requisitos para PR

- [ ] El código pasa todos los tests existentes
- [ ] Se añaden tests para nuevas funcionalidades
- [ ] La cobertura de tests no disminuye
- [ ] El código sigue PEP 8 (verificado con flake8)
- [ ] La documentación está actualizada
- [ ] Los commits siguen Conventional Commits
- [ ] No hay conflictos con la rama `main`

### 📏 Convenciones de Código

```bash
# Formatear código con black
black .

# Verificar estilo con flake8
flake8 .

# Ordenar imports con isort
isort . 
```

---

## 📚 Documentación

- 📖 [Documentación oficial de Django](https://docs.djangoproject.com/)
- 🔌 [Django REST Framework](https://www.django-rest-framework.org/)
- 🔐 [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/)
- 🐘 [PostgreSQL](https://www.postgresql.org/docs/)

---

## 📜 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**. 

```
MIT License

Copyright (c) 2025 ART-ADORNOS Organization

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[Ver archivo LICENSE completo](LICENSE)
```

---

## 👥 Equipo y Contacto

<div align="center">

### 👤 Autor Principal

**Freddy Andres Zambrano Quilambaqui**

[![GitHub](https://img.shields.io/badge/GitHub-freddyandreszambrano-181717?style=for-the-badge&logo=github)](https://github.com/freddyandreszambrano)
[![Email](https://img.shields.io/badge/Email-freddyfazq0614@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:freddyfazq0614@gmail. com)

### 🏢 Organización

[![ART-ADORNOS](https://img.shields.io/badge/GitHub-ART--ADORNOS-181717? style=for-the-badge&logo=github)](https://github.com/ART-ADORNOS)

---

### 💬 Soporte y Consultas

- 🐛 **Reportar bugs:** [Issues](https://github.com/ART-ADORNOS/art-adornos-core/issues)
- 💡 **Sugerir features:** [Discussions](https://github.com/ART-ADORNOS/art-adornos-core/discussions)
- 📧 **Contacto directo:** [freddyfazq0614@gmail. com](mailto:freddyfazq0614@gmail.com)

</div>

---

## 🙏 Agradecimientos

Agradecemos a todos los contribuidores y a la comunidad open source por hacer posible este proyecto. 

Un agradecimiento especial a: 

- 🎯 El equipo de Django y Django REST Framework
- 🔐 Los mantenedores de Simple JWT
- 📊 SonarCloud por su plataforma de análisis
- 🚀 GitHub por su infraestructura de CI/CD

---

<div align="center">

## 🎨 ART-ADORNOS Core

**Backend oficial de la organización ART-ADORNOS**

*Diseñado para escalar, mantenerse y evolucionar*

---

[![Stars](https://img.shields.io/github/stars/ART-ADORNOS/art-adornos-core?style=social)](https://github.com/ART-ADORNOS/art-adornos-core/stargazers)
[![Forks](https://img.shields.io/github/forks/ART-ADORNOS/art-adornos-core?style=social)](https://github.com/ART-ADORNOS/art-adornos-core/network/members)
[![Issues](https://img.shields.io/github/issues/ART-ADORNOS/art-adornos-core)](https://github.com/ART-ADORNOS/art-adornos-core/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/ART-ADORNOS/art-adornos-core)](https://github.com/ART-ADORNOS/art-adornos-core/pulls)

⭐ **Si este proyecto te resulta útil, considera darle una estrella en GitHub**

Made with ❤️ by the ART-ADORNOS team

</div>