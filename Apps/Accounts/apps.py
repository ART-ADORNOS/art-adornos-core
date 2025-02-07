from django.apps import AppConfig
# from django.db.models.signals import post_migrate


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Apps.Accounts'


# def create_groups_and_permissions(sender, **kwargs):
#     from .permissions import create_sellers_group
#     create_sellers_group()
#
# class ProductsConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'Products'
#
#     def ready(self):
#         post_migrate.connect(create_groups_and_permissions, sender=self)