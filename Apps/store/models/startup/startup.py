import logging

from django.db import models
from django.utils.text import slugify
from django_currentuser.middleware import (get_current_authenticated_user)

from Apps.Accounts.models import User
from Apps.store.utilities.enums.icon import Icon
from Apps.store.utilities.enums.industry import Industry

logger = logging.getLogger(__name__)


class ModelBase(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    created_by = models.CharField(max_length=100, blank=True, null=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    update_by = models.CharField(max_length=100, blank=True, null=True, editable=False)

    @property
    def created_at_format(self):
        return self.created_at.strftime("%Y-%m-%d %H:%M:%S")

    @property
    def updated_at_format(self):
        return self.updated_at.strftime("%Y-%m-%d %H:%M:%S")

    def save(self, *args, **kwargs):
        try:
            user = get_current_authenticated_user()
            if self._state.adding:
                self.created_by = user.username
            else:
                self.update_by = user.username
        except Exception as e:
            logger.error(f"Error in ModelBase save method: {e}")
            raise

        super().save(*args, **kwargs)

    class Meta:
        abstract = True


class Startup(ModelBase):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='startups', verbose_name='Propietario')
    name = models.TextField(verbose_name='Nombre')
    description = models.TextField(verbose_name='Descripción')
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True, verbose_name='Slug')
    is_active = models.BooleanField(default=True, verbose_name='Activo')
    industry = models.TextField(choices=Industry.choices, verbose_name='Industria')
    icon = models.TextField(choices=Icon.choices, blank=True, verbose_name='Icon')

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Startup'
        verbose_name_plural = 'Startups'
        ordering = ['id']
