REQ_DIR        = requirements
PROD           = $(REQ_DIR)/production.txt
DEV            = $(REQ_DIR)/development.txt
DOCKER_IMAGE   = CodeCrafters/app

.PHONY: \
	install-prod install-dev \
	test \
	sync-dev sync-prod diff-dev diff-prod \
	update_database reset-db psql \
	docker-build docker-run up down logs \
	gis-up gis-down gis-restart gis-logs \
	secret_key


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
	docker exec -it codecrafters_postgres psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)


# ======================================================
# 🐳 DOCKER
# ======================================================

docker-build:
	docker build -t $(DOCKER_IMAGE) .

docker-run:
	docker run -p 8000:8000 $(DOCKER_IMAGE)

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f


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
# 🚀 VERSIONING / RELEASE (Git Flow + Docker)
# ======================================================

VERSION_FILE = VERSION
VERSION      = $(shell cat $(VERSION_FILE) 2>/dev/null || echo "1.0.0")

.PHONY: version init-version bump-patch bump-minor bump-major tag release check-main

# Show current version
version:
	@echo "📦 Current version: $(VERSION)"

# Initialize VERSION file if it does not exist
init-version:
	@if [ ! -f $(VERSION_FILE) ]; then \
		echo "1.0.0" > $(VERSION_FILE); \
		git add $(VERSION_FILE); \
		git commit -m "chore: initialize version 1.0.0"; \
		echo "✅ VERSION initialized to 1.0.0"; \
	else \
		echo "ℹ️ VERSION already exists ($(VERSION))"; \
	fi

# Ensure releases are only done from main branch
check-main:
	@branch=$$(git rev-parse --abbrev-ref HEAD); \
	if [ "$$branch" != "main" ]; then \
		echo "❌ Releases are only allowed from main branch (current: $$branch)"; \
		exit 1; \
	fi

# Increment PATCH version (x.y.Z)
bump-patch:
	@python - <<EOF > $(VERSION_FILE)
	v = "$(VERSION)".split(".")
	v[2] = str(int(v[2]) + 1)
	print(".".join(v))
	EOF
		@git add $(VERSION_FILE)
		@git commit -m "chore(release): bump version to $$(cat $(VERSION_FILE))"
		@echo "🔖 Patch version -> $$(cat $(VERSION_FILE))"

# Increment MINOR version (x.Y.0)
bump-minor:
	@python - <<EOF > $(VERSION_FILE)
	v = "$(VERSION)".split(".")
	v[1] = str(int(v[1]) + 1)
	v[2] = "0"
	print(".".join(v))
	EOF
		@git add $(VERSION_FILE)
		@git commit -m "chore(release): bump version to $$(cat $(VERSION_FILE))"
		@echo "🔖 Minor version -> $$(cat $(VERSION_FILE))"

# Increment MAJOR version (X.0.0)
bump-major:
	@python - <<EOF > $(VERSION_FILE)
	v = "$(VERSION)".split(".")
	v[0] = str(int(v[0]) + 1)
	v[1] = "0"
	v[2] = "0"
	print(".".join(v))
	EOF
		@git add $(VERSION_FILE)
		@git commit -m "chore(release): bump version to $$(cat $(VERSION_FILE))"
		@echo "🔖 Major version -> $$(cat $(VERSION_FILE))"

# Create and push git tag
tag:
	@git tag -a v$(VERSION) -m "Release v$(VERSION)"
	@git push origin v$(VERSION)
	@echo "🏷️ Git tag v$(VERSION) created and pushed"

# Full release flow
release: check-main bump-patch tag
	@echo "🚀 Release v$$(cat $(VERSION_FILE)) completed successfully"


release-dev:
	@branch=$$(git rev-parse --abbrev-ref HEAD); \
	if [ "$$branch" != "develop" ]; then \
		echo "❌ Staging releases are only allowed from develop"; \
		exit 1; \
	fi

	@python - <<EOF > $(VERSION_FILE)
	v = "$(VERSION)".split(".")
	v[2] = str(int(v[2]) + 1)
	print(".".join(v) + "-dev.1")
	EOF

		@git add $(VERSION_FILE)
		@git commit -m "chore(release): staging $$(cat $(VERSION_FILE))"
		@git tag -a v$$(cat $(VERSION_FILE)) -m "Staging release v$$(cat $(VERSION_FILE))"
		@git push origin develop --tags
