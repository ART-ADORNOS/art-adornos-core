from django.db import models
from django.forms import model_to_dict

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

    def to_json_api(self):
        items = model_to_dict(self, exclude=['customer', 'cart', 'startup', 'date_updated', 'hour_updated', 'created_at'])
        items['customer_name'] = self.customer.get_full_name()
        items['status'] = self.get_status_display()
        items['created_at'] = self.created_at.strftime('%Y-%m-%d')
        items['startup'] = self.startup.name
        items['customer_initials'] = self.customer.get_initials()
        items['total_amount'] = str(self.total_amount)
        return items

    class Meta:
        verbose_name = 'Orden'
        verbose_name_plural = 'Órdenes'
        ordering = ['-created_at']


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items', verbose_name='Orden')
    product = models.ForeignKey('Product', on_delete=models.CASCADE, verbose_name='Producto')
    quantity = models.PositiveIntegerField(verbose_name='Cantidad')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio')

    def to_json_api(self, request=None):
        items = model_to_dict(self, exclude=['order'])
        items['product_name'] = self.product.name
        items['total_price'] = str(self.price * self.quantity)
        items['price'] = str(self.price)
        items['image_product'] = self.product.get_image_url(request=request)
        return items

    class Meta:
        verbose_name = 'Ítem de Orden'
        verbose_name_plural = 'Ítems de Orden'
        ordering = ['id']
