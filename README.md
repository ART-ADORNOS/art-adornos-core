# 🎨 ArtHome - Plataforma de Gestión de Catálogos 

![Django](https://img.shields.io/badge/Django-5.1.1-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.10-blueviolet)
![SonarCloud](https://img.shields.io/badge/SonarCloud-Analysis-orange)

**ArtHome** es una plataforma web desarrollada con Django en el backend y React en el frontend, diseñada para gestionar y vender productos artísticos y adornos. Permite a los usuarios registrarse, iniciar sesión y gestionar su perfil, mientras que los vendedores pueden administrar sus productos y startups.

## 🚀 Características Principales

- **Autenticación de Usuarios**: Registro, inicio de sesión, actualización de perfil y eliminación de cuenta.
- **Gestión de Productos**: Los vendedores pueden agregar, editar y eliminar productos.
- **Gestión de Startups**: Creación y administración de startups por parte de los vendedores.
- **Interfaz Moderna**: Diseño responsivo y atractivo con TailwindCSS.
- **API RESTful**: Desarrollo basado en Django REST Framework.
- **Autenticación JWT**: Seguridad a través de JSON Web Tokens.

## 🛠️ Configuración del Proyecto

### 🐍 Backend (Django)

#### Clonar el repositorio
```bash
git clone https://github.com/freddyandreszambrano/ART_ADORNOS.git
cd ART_ADORNOS
```

#### Crear un entorno virtual e instalar dependencias
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements\delelopment.txt
```

#### Aplicar migraciones y ejecutar el servidor
```bash
python manage.py migrate
python manage.py runserver
```

### ⚛️ Frontend (React)

#### Navegar a la carpeta del frontend e instalar dependencias
```bash
cd frontend
npm install
```

#### Ejecutar la aplicación React
```bash
npm start
```

## 🔄 Integración Continua y Calidad del Código

El proyecto utiliza **GitHub Actions** para CI/CD y **SonarCloud** para análisis de código. Los workflows están configurados en `.github/workflows/`:

- **Django CI**: Se ejecuta en cada push a `develop` y en pull requests.
- **SonarCloud Analysis**: Se ejecuta en cada push para análisis de calidad.

## 🚀 Despliegue

El proyecto puede desplegarse en plataformas como **Heroku, Vercel o AWS**. Asegúrate de configurar variables de entorno en producción:

- `SECRET_KEY`
- `DEBUG`
- `ALLOWED_HOSTS`

## 🤝 Contribución

Si deseas contribuir, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Añade nueva funcionalidad"
   ```
4. Haz push a la rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un pull request en GitHub.

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Nombre**: Freddy Andres Zambrano Quilambaqui
- **Email**: freddyfazq0614@gmail.com
- **GitHub**: [freddyandreszambrano](https://github.com/freddyandreszambrano)

---

¡Gracias por visitar **ArtHome**! Esperamos que disfrutes utilizando esta plataforma tanto como nosotros disfrutamos desarrollándola.

