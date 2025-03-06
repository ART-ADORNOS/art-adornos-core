from Apps.store.models import ModelBase
from django.db import models


class Category(ModelBase):
    start_up = models.ForeignKey('Startup', on_delete=models.CASCADE, verbose_name='Startup', blank=True, null=True)
    name = models.CharField(max_length=255, verbose_name='Nombre')
    description = models.TextField(verbose_name='Descripción', blank=True, null=True)
    state = models.BooleanField(default=True, verbose_name='Estado')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'
        ordering = ['id']

