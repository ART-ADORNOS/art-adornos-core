from django.db import models
from django.contrib.auth.models import Permission, Group
from django.contrib.contenttypes.models import ContentType


class SellerProfile(models.Model):
    user = models.OneToOneField("Accounts.User", on_delete=models.CASCADE, related_name="seller_profile",verbose_name="Usuario")
    phone = models.CharField(max_length=20, blank=True, verbose_name='Teléfono')
    address = models.CharField(max_length=100, blank=True, verbose_name='Dirección')
    city = models.CharField(max_length=50, blank=True, verbose_name='Ciudad')
    country = models.CharField(max_length=50, blank=True, verbose_name='País')
    is_seller = models.BooleanField(default=True, verbose_name='Es vendedor')

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.is_seller:
            self.assign_seller_permissions()

    def assign_seller_permissions(self):
        from Apps.store.models.product import Category, Product
        from Apps.store.models.startup import Startup
        group_name = "Vendedores"
        seller_group, created = Group.objects.get_or_create(name=group_name)
        models_to_include = [Category, Product, Startup]

        for model in models_to_include:
            content_type = ContentType.objects.get_for_model(model)
            permissions = Permission.objects.filter(content_type=content_type)
            for perm in permissions:
                seller_group.permissions.add(perm)

        self.user.groups.add(seller_group)
