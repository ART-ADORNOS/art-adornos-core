import logging

from django.db import models
from django.forms import model_to_dict
from django.utils.text import slugify

from core.Accounts.models import User
from core.store.models import ModelBase
from core.store.utils.enums.icon import Icon
from core.store.utils.enums.industry import Industry

logger = logging.getLogger(__name__)


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

    def to_json_api(self):
        item = model_to_dict(self, exclude=['owner', 'created_at', 'updated_at', 'slug'])
        item['owner'] = self.owner_id
        item['industry_display'] = self.get_industry_display()
        return item

    class Meta:
        verbose_name = 'Startup'
        verbose_name_plural = 'Startups'
        ordering = ['id']
