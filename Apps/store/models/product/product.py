from django.db import models
from ..startup.startup import ModelBase


class Product(ModelBase):
    start_up = models.ForeignKey('Startup', on_delete=models.CASCADE, verbose_name='Startup')
    name = models.CharField(max_length=255, verbose_name='Nombre')
    description = models.TextField(verbose_name='Descripción')
    category = models.ForeignKey('Category', on_delete=models.CASCADE, verbose_name='Categoría')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio')
    stock = models.IntegerField(verbose_name='Stock')
    state = models.BooleanField(default=True, verbose_name='Estado')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['id']