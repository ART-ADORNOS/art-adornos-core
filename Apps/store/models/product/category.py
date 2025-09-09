from django.db import models
from django.forms import model_to_dict

from Apps.store.models import ModelBase


class Category(ModelBase):
    start_up = models.ForeignKey('Startup', on_delete=models.CASCADE, verbose_name='Startup')
    name = models.CharField(max_length=255, verbose_name='Nombre')
    description = models.TextField(verbose_name='Descripción', blank=True, null=True)
    state = models.BooleanField(default=True, verbose_name='Estado')

    def __str__(self):
        return self.name

    def to_json_api(self):
        item = model_to_dict(self, exclude=['start_up'])
        item['id'] = self.id
        item['start_up'] = self.start_up.id
        return item

    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'
        ordering = ['id']
