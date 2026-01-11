REQ_DIR        = requirements
PROD           = $(REQ_DIR)/production.txt
DEV            = $(REQ_DIR)/development.txt
DOCKER_IMAGE   = freddyandreszambrano/art-adornos-core

.PHONY: \
	install-prod install-dev \
	test \
	sync-dev sync-prod diff-dev diff-prod \
	update_database reset-db psql \
	dev-up dev-down dev-logs dev-restart dev-rebuild dev-shell dev-migrate dev-makemigrations dev-test dev-clean \
	docker-build docker-push prod-up prod-down staging-up staging-down \
	gis-up gis-down gis-restart gis-logs \
	secret_key version \
	release-main release-develop last-tags


# ======================================================
# 🐍 PYTHON / DJANGO
# ======================================================

install-prod:
	pip install -r $(PROD)

install-dev:
	pip install -r $(DEV)

test:
	coverage run manage.py test
	coverage report
	coverage xml

secret_key:
	python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'


# ======================================================
# 📦 DEPENDENCIAS / REQUIREMENTS
# ======================================================

sync-dev:
	@echo "↪️  Guardando dependencias del entorno actual a develop.tmp.txt..."
	pip freeze | grep -v "pkg-resources" > $(REQ_DIR)/develop.tmp.txt
	@echo "✅ Revisar $(REQ_DIR)/develop.tmp.txt y reemplazar develop.txt si es correcto."

sync-prod:
	@echo "↪️  Guardando dependencias del entorno actual a production.tmp.txt..."
	pip freeze | grep -v "pkg-resources" > $(REQ_DIR)/production.tmp.txt
	@echo "✅ Revisar $(REQ_DIR)/production.tmp.txt y reemplazar production.txt si es correcto."

diff-dev:
	@echo "🔍 Comparando develop.txt con develop.tmp.txt..."
	@diff -u $(REQ_DIR)/develop.txt $(REQ_DIR)/develop.tmp.txt || echo "✔️ No hay diferencias."

diff-prod:
	@echo "🔍 Comparando production.txt con production.tmp.txt..."
	@diff -u $(REQ_DIR)/production.txt $(REQ_DIR)/production.tmp.txt || echo "✔️ No hay diferencias."


# ======================================================
# 🗄️ BASE DE DATOS
# ======================================================

update_database:
	@echo "🔄 Ejecutando migraciones..."
	python manage.py makemigrations
	python manage.py migrate

reset-db:
	@echo "⚠️  Limpiando base de datos completa (DROP + CREATE)..."
	bash scripts/reset_db.sh
	@echo "🔄 Ejecutando migraciones..."
	make update_database
	@echo "✨ Base de datos limpia y migraciones aplicadas."

psql:
	docker exec -it art_adornos_db_dev psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)


# ======================================================
# 🐳 DOCKER - DESARROLLO LOCAL
# ======================================================

dev-up:
	docker-compose -f docker-compose.dev.yml up -d

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

dev-restart:
	docker-compose -f docker-compose.dev.yml restart

dev-rebuild:
	docker-compose -f docker-compose.dev.yml up -d --build

dev-shell:
	docker-compose -f docker-compose.dev.yml exec web bash

dev-migrate:
	docker-compose -f docker-compose.dev.yml exec web python manage.py migrate

dev-makemigrations:
	docker-compose -f docker-compose.dev.yml exec web python manage.py makemigrations

dev-test:
	docker-compose -f docker-compose.dev.yml exec web python manage.py test

dev-clean:
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -f


# ======================================================
# 🐳 DOCKER - BUILD Y PUSH (CI/CD)
# ======================================================

docker-build:
	@echo "🐳 Building Docker image: $(DOCKER_IMAGE):$(VERSION)"
	docker build -t $(DOCKER_IMAGE):$(VERSION) .

docker-push:
	@echo "📤 Pushing Docker image: $(DOCKER_IMAGE):$(VERSION)"
	docker push $(DOCKER_IMAGE):$(VERSION)


# ======================================================
# 🐳 DOCKER - DESPLIEGUE EN SERVIDOR
# ======================================================

prod-up:
	docker-compose -f docker/production/docker-compose.yml up -d

prod-down:
	docker-compose -f docker/production/docker-compose.yml down

prod-logs:
	docker-compose -f docker/production/docker-compose.yml logs -f

staging-up:
	docker-compose -f docker/staging/docker-compose.yml up -d

staging-down:
	docker-compose -f docker/staging/docker-compose.yml down

staging-logs:
	docker-compose -f docker/staging/docker-compose.yml logs -f


# ======================================================
# 🗺️ GIS / DOCKER COMPOSE ESPECIAL
# ======================================================

gis-up:
	docker compose -f docker-compose.gis.yml -p rimay_gis up -d

gis-down:
	docker compose -f docker-compose.gis.yml -p rimay_gis down

gis-restart:
	docker compose -f docker-compose.gis.yml -p rimay_gis down
	docker compose -f docker-compose.gis.yml -p rimay_gis up -d

gis-logs:
	docker compose -f docker-compose.gis.yml -p rimay_gis logs -f


# ======================================================
# 🚀 VERSIONING / RELEASE
# ======================================================

# Mostrar últimas 5 tags
last-tags:
	@echo "📋 Últimos tags:"
	@git tag --sort=-creatordate | head -n 5

# Mostrar versión actual
version:
	@echo "🌿 Current branch: $$(git rev-parse --abbrev-ref HEAD)"
	@echo ""
	@echo "📋 Últimos 3 tags:"
	@git tag --sort=-creatordate | head -n 3


# ======================================================
# 🏭 PRODUCTION RELEASES (desde main)
# ======================================================

release-main:
	@echo "🔍 Verificando rama..."
	@branch=$$(git rev-parse --abbrev-ref HEAD); \
	if [ "$$branch" != "main" ]; then \
		echo "❌ Los releases de producción solo se pueden hacer desde 'main' (actual: $$branch)"; \
		echo "💡 Para releases de staging usa: make release-develop"; \
		exit 1; \
	fi
	@echo "✅ Rama correcta: main"
	@echo ""
	@echo "📦 Buscando último tag de producción..."
	@last_tag=$$(git tag -l "v*.*.*" --sort=-creatordate | grep -v "dev" | head -n 1); \
	if [ -z "$$last_tag" ]; then \
		new_tag="v1.0.0"; \
		echo "⚠️  No hay tags previos, iniciando en: $$new_tag"; \
	else \
		echo "📌 Último tag: $$last_tag"; \
		version=$$(echo $$last_tag | sed 's/v//'); \
		major=$$(echo $$version | cut -d. -f1); \
		minor=$$(echo $$version | cut -d. -f2); \
		patch=$$(echo $$version | cut -d. -f3); \
		new_patch=$$(($$patch + 1)); \
		new_tag="v$$major.$$minor.$$new_patch"; \
		echo "🆕 Nuevo tag: $$new_tag"; \
	fi; \
	echo ""; \
	read -p "¿Continuar con el tag $$new_tag? (y/n): " confirm; \
	if [ "$$confirm" != "y" ]; then \
		echo "❌ Cancelado"; \
		exit 1; \
	fi; \
	git tag -a "$$new_tag" -m "🔖 Release $$new_tag"; \
	echo ""; \
	echo "✅ Tag creado: $$new_tag"; \
	echo "🏷️  Empujando tag..."; \
	git push origin "$$new_tag"; \
	echo ""; \
	echo "🎉 Release completado!"; \
	echo "🚀 El workflow de CI/CD construirá y desplegará automáticamente"


# ======================================================
# 🧪 STAGING RELEASES (desde develop)
# ======================================================

release-develop:
	@echo "🔍 Verificando rama..."
	@branch=$$(git rev-parse --abbrev-ref HEAD); \
	if [ "$$branch" != "develop" ]; then \
		echo "❌ Los releases de staging solo se pueden hacer desde 'develop' (actual: $$branch)"; \
		echo "💡 Para releases de producción usa: make release-main"; \
		exit 1; \
	fi
	@echo "✅ Rama correcta: develop"
	@echo ""
	@echo "📦 Buscando último tag de staging..."
	@last_tag=$$(git tag -l "v*.*.*-dev.*" --sort=-creatordate | head -n 1); \
	if [ -z "$$last_tag" ]; then \
		new_tag="v1.0.0-dev.1"; \
		echo "⚠️  No hay tags previos de staging, iniciando en: $$new_tag"; \
	else \
		echo "📌 Último tag: $$last_tag"; \
		version=$$(echo $$last_tag | sed 's/v//' | sed 's/-dev.*//'); \
		major=$$(echo $$version | cut -d. -f1); \
		minor=$$(echo $$version | cut -d. -f2); \
		patch=$$(echo $$version | cut -d. -f3); \
		new_patch=$$(($$patch + 1)); \
		new_tag="v$$major.$$minor.$$new_patch-dev.1"; \
		echo "🆕 Nuevo tag: $$new_tag"; \
	fi; \
	echo ""; \
	read -p "¿Continuar con el tag $$new_tag? (y/n): " confirm; \
	if [ "$$confirm" != "y" ]; then \
		echo "❌ Cancelado"; \
		exit 1; \
	fi; \
	git tag -a "$$new_tag" -m "🔖 Staging release $$new_tag"; \
	echo ""; \
	echo "✅ Tag creado: $$new_tag"; \
	echo "🏷️  Empujando tag..."; \
	git push origin "$$new_tag"; \
	echo ""; \
	echo "🎉 Staging release completado!"; \
	echo "🚀 El workflow de CI/CD construirá y desplegará automáticamente"


# ======================================================
# 📋 AYUDA
# ======================================================

help:
	@echo "🚀 Comandos de Release Disponibles:"
	@echo ""
	@echo "  make version              - Mostrar rama actual y últimos tags"
	@echo "  make last-tags            - Mostrar últimos 5 tags"
	@echo ""
	@echo "  📦 PRODUCTION (desde main):"
	@echo "  make release-main         - Crear release de producción"
	@echo "                              Ejemplo: v1.0.0 -> v1.0.1"
	@echo "                              Busca último tag sin '-dev'"
	@echo ""
	@echo "  🧪 STAGING (desde develop):"
	@echo "  make release-develop      - Crear release de staging"
	@echo "                              Ejemplo: v1.0.0-dev.1 -> v1.0.1-dev.1"
	@echo "                              Busca último tag con '-dev'"
	@echo ""
	@echo "  🐳 DOCKER:"
	@echo "  make dev-up               - Levantar entorno de desarrollo"
	@echo "  make dev-down             - Detener entorno de desarrollo"
	@echo "  make dev-logs             - Ver logs del entorno de desarrollo"
	@echo ""
	@echo "  💡 NOTA: Los releases crean tags automáticamente"
	@echo "           No necesitas archivo VERSION, usa los tags de git"
	@echo ""