from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
    Group,
    Permission
)
from django.db import models
from django.contrib.contenttypes.models import ContentType


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, is_seller=False, **extra_fields):
        if not email:
            raise ValueError("El campo Email es obligatorio.")
        if not username:
            raise ValueError("El campo Username es obligatorio.")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, is_seller=is_seller, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        user.assign_permissions()
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, email, password, is_seller=False, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True, verbose_name="Usuario")
    email = models.EmailField(unique=True, verbose_name="Correo electrónico")
    first_name = models.CharField(max_length=30, verbose_name="Nombre")
    last_name = models.CharField(max_length=30, blank=True, verbose_name="Apellido")
    phone = models.CharField(max_length=20, blank=True, verbose_name='Teléfono')
    address = models.CharField(max_length=100, blank=True, verbose_name='Dirección')
    city = models.CharField(max_length=50, blank=True, verbose_name='Ciudad')
    country = models.CharField(max_length=50, blank=True, verbose_name='País')
    is_active = models.BooleanField(default=True, verbose_name="Activo")
    is_staff = models.BooleanField(default=True, verbose_name="Staff")
    is_seller = models.BooleanField(default=False, verbose_name="Es vendedor")
    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def get_initials(self):
        first_letter = self.first_name[0] if self.first_name else ''
        last_letter = self.last_name[0] if self.last_name else ''
        return (first_letter + last_letter).upper()

    def assign_permissions(self):
        from Apps.store.models.product import Category, Product
        from Apps.store.models.startup import Startup
        models_to_include = [Category, Product, Startup]

        if self.is_seller:
            group_name = "Vendedores"
            group, _ = Group.objects.get_or_create(name=group_name)
            for model in models_to_include:
                content_type = ContentType.objects.get_for_model(model)
                permissions = Permission.objects.filter(content_type=content_type)
                for perm in permissions:
                    group.permissions.add(perm)
            self.groups.add(group)
        else:
            group_name = "Clientes"
            group, _ = Group.objects.get_or_create(name=group_name)
            for model in models_to_include:
                content_type = ContentType.objects.get_for_model(model)
                permissions = Permission.objects.filter(
                    content_type=content_type, codename__startswith="view_"
                )
                for perm in permissions:
                    group.permissions.add(perm)
            self.groups.add(group)
