# 🐳 Docker Configuration

## 📁 Estructura

```
├── Dockerfile                          # Dockerfile único para prod y staging
├── docker-compose.dev.yml              # Desarrollo local
├── .dockerignore                       # Archivos a ignorar en build
└── docker/
    ├── production/
    │   └── docker-compose.yml          # Despliegue manual en producción
    └── staging/
        └── docker-compose.yml          # Despliegue manual en staging
```

## 🚀 Uso

### Desarrollo Local

```bash
# Levantar entorno de desarrollo
make dev-up

# Ver logs
make dev-logs

# Ejecutar migraciones
make dev-migrate

# Reconstruir contenedores
make dev-rebuild

# Limpiar todo (incluyendo volúmenes)
make dev-clean
```

### CI/CD (Automático)

El `Dockerfile` en la raíz se usa automáticamente en GitHub Actions cuando:

- Push a tag `v*.*.*` → Construye imagen para **production**
- Push a tag `v*-dev.*` → Construye imagen para **staging**

Las imágenes se suben automáticamente a Docker Hub.

### Despliegue Manual en Servidor

**Production:**

```bash
# En el servidor de producción
cd /path/to/project
export VERSION=1.0.0
export DOCKER_IMAGE=freddyandreszambrano/art-adornos-core
docker-compose -f docker/production/docker-compose.yml up -d
```

**Staging:**

```bash
# En el servidor de staging
cd /path/to/project
export VERSION=1.0.1-dev.1
export DOCKER_IMAGE=freddyandreszambrano/art-adornos-core
docker-compose -f docker/staging/docker-compose.yml up -d
```

## 🔧 Configuración

### Variables de Entorno

Crea los siguientes archivos según el ambiente:

**`.env`** (desarrollo local)

```env
SECRET_KEY=your-secret-key
DB_NAME=art_adornos_dev
DB_USER=postgres
DB_PASSWORD=postgres
DEBUG=True
```

**`.env.production`** (servidor producción)

```env
SECRET_KEY=production-secret-key
DB_NAME=art_adornos_prod
DB_USER=prod_user
DB_PASSWORD=secure-password
DEBUG=False
ALLOWED_HOSTS=yourdomain.com
```

**`.env.staging`** (servidor staging)

```env
SECRET_KEY=staging-secret-key
DB_NAME=art_adornos_staging
DB_USER=staging_user
DB_PASSWORD=staging-password
DEBUG=True
ALLOWED_HOSTS=staging.yourdomain.com
```

## 📝 Notas

- **Un solo Dockerfile**: Se usa el mismo Dockerfile para todos los ambientes
- **Diferenciación**: La diferencia entre ambientes se maneja con variables de entorno y configuración de docker-compose
- **CI/CD**: Los workflows de GitHub Actions construyen y suben automáticamente las imágenes
- **Despliegue manual**: Los docker-compose en `docker/` son opcionales, para despliegue manual en servidores