from django.db import models
from django.contrib.auth.models import Permission
from Apps.Accounts.models import User


class SellerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='seller_profile', verbose_name='vendedor')
    phone = models.CharField(max_length=20, blank=True, verbose_name='Teléfono')
    direction = models.CharField(max_length=20, blank=True, verbose_name='Dirección')
    city = models.CharField(max_length=50, blank=True, verbose_name='Ciudad')
    country = models.CharField(max_length=50, blank=True, verbose_name='País')
    is_seller = models.BooleanField(default=True, verbose_name='Es vendedor')

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # if self.is_seller:
        #     self.assign_seller_permissions()

    # def assign_seller_permissions(self):
    #     app_label = 'Products'  # Cambia esto al nombre de tu aplicación de productos
    #     permissions = [
    #         f'{app_label}.add_product',
    #         f'{app_label}.change_product',
    #         f'{app_label}.delete_product',
    #         f'{app_label}.view_product',
    #     ]
    #     for perm in permissions:
    #         permission = Permission.objects.get(codename=perm.split('.')[1])
    #         self.user.user_permissions.add(permission)
