from django.db import models

from Apps.store.models import ModelBase
from Apps.store.utilities.enums.order_status import OrderStatus


class Order(ModelBase):
    customer = models.ForeignKey('Accounts.User', on_delete=models.CASCADE, verbose_name='Cliente')
    cart = models.ForeignKey('store.Cart', on_delete=models.CASCADE, verbose_name='Carrito')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Monto Total')
    status = models.TextField(choices=OrderStatus.choices, verbose_name='Status')
    date_updated = models.DateTimeField(auto_now=True, verbose_name='Fecha de Actualización')
    hour_updated = models.TimeField(auto_now=True, verbose_name='Hora de Actualización')
    startup = models.ForeignKey('store.Startup', on_delete=models.CASCADE, verbose_name='Startup',
                                related_name='orders')

    class Meta:
        verbose_name = 'Orden'
        verbose_name_plural = 'Órdenes'
        ordering = ['-created_at']


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items', verbose_name='Orden')
    product = models.ForeignKey('Product', on_delete=models.CASCADE, verbose_name='Producto')
    quantity = models.PositiveIntegerField(verbose_name='Cantidad')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio')

    class Meta:
        verbose_name = 'Ítem de Orden'
        verbose_name_plural = 'Ítems de Orden'
        ordering = ['id']
