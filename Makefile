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
	release-main release-develop


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

VERSION_FILE = VERSION

# Mostrar versión actual
version:
	@if [ -f $(VERSION_FILE) ]; then \
		echo "📦 Current version: $$(cat $(VERSION_FILE))"; \
	else \
		echo "⚠️  No VERSION file found"; \
	fi
	@echo "🌿 Current branch: $$(git rev-parse --abbrev-ref HEAD)"


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
	@python3 -c '\
import sys; \
version_file = "$(VERSION_FILE)"; \
try: \
    with open(version_file, "r") as f: \
        current = f.read().strip(); \
except FileNotFoundError: \
    current = "1.0.0"; \
    print("⚠️  VERSION no existe, inicializando en 1.0.0"); \
if "-dev" in current: \
    print(f"⚠️  Versión actual contiene -dev: {current}"); \
    current = current.split("-dev")[0]; \
    print(f"🔄 Limpiando a: {current}"); \
print(f"📦 Versión actual: {current}"); \
parts = current.split("."); \
if len(parts) != 3: \
    print(f"❌ Formato de versión inválido: {current}"); \
    sys.exit(1); \
parts[2] = str(int(parts[2]) + 1); \
new_version = ".".join(parts); \
print(f"🆕 Nueva versión: {new_version}"); \
with open(version_file, "w") as f: \
    f.write(new_version); \
with open(".version_temp", "w") as f: \
    f.write(new_version); \
'
	@new_version=$$(cat .version_temp); \
	rm -f .version_temp; \
	git add $(VERSION_FILE); \
	git commit -m "🔖 chore(release): bump version to $$new_version"; \
	git tag -a "v$$new_version" -m "Release v$$new_version"; \
	echo ""; \
	echo "✅ Versión actualizada a: $$new_version"; \
	echo "🏷️  Tag creado: v$$new_version"; \
	echo ""; \
	echo "📤 Empujando cambios..."; \
	git push origin main; \
	git push origin "v$$new_version"; \
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
	@python3 -c '\
import sys; \
version_file = "$(VERSION_FILE)"; \
try: \
    with open(version_file, "r") as f: \
        current = f.read().strip(); \
except FileNotFoundError: \
    current = "1.0.0"; \
    print("⚠️  VERSION no existe, inicializando en 1.0.0"); \
if "-dev" in current: \
    print(f"⚠️  Versión actual contiene -dev: {current}"); \
    current = current.split("-dev")[0]; \
    print(f"🔄 Limpiando a: {current}"); \
print(f"📦 Versión base: {current}"); \
parts = current.split("."); \
if len(parts) != 3: \
    print(f"❌ Formato de versión inválido: {current}"); \
    sys.exit(1); \
parts[2] = str(int(parts[2]) + 1); \
new_version = ".".join(parts) + "-dev.1"; \
print(f"🆕 Nueva versión staging: {new_version}"); \
with open(version_file, "w") as f: \
    f.write(new_version); \
with open(".version_temp", "w") as f: \
    f.write(new_version); \
'
	@new_version=$$(cat .version_temp); \
	rm -f .version_temp; \
	git add $(VERSION_FILE); \
	git commit -m "🔖 chore(release): staging $$new_version"; \
	git tag -a "v$$new_version" -m "Staging release v$$new_version"; \
	echo ""; \
	echo "✅ Versión actualizada a: $$new_version"; \
	echo "🏷️  Tag creado: v$$new_version"; \
	echo ""; \
	echo "📤 Empujando cambios..."; \
	git push origin develop; \
	git push origin "v$$new_version"; \
	echo ""; \
	echo "🎉 Staging release completado!"; \
	echo "🚀 El workflow de CI/CD construirá y desplegará automáticamente"


# ======================================================
# 📋 AYUDA
# ======================================================

help:
	@echo "🚀 Comandos de Release Disponibles:"
	@echo ""
	@echo "  make version              - Mostrar versión actual"
	@echo ""
	@echo "  📦 PRODUCTION (desde main):"
	@echo "  make release-main         - Crear release de producción"
	@echo "                              Ejemplo: 1.0.0 -> 1.0.1 -> tag v1.0.1"
	@echo ""
	@echo "  🧪 STAGING (desde develop):"
	@echo "  make release-develop      - Crear release de staging"
	@echo "                              Ejemplo: 1.0.0 -> 1.0.1-dev.1 -> tag v1.0.1-dev.1"
	@echo ""
	@echo "  🐳 DOCKER:"
	@echo "  make dev-up               - Levantar entorno de desarrollo"
	@echo "  make dev-down             - Detener entorno de desarrollo"
	@echo "  make dev-logs             - Ver logs del entorno de desarrollo"
	@echo ""