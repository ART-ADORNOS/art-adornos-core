from django.db import models
from django.forms import model_to_dict

from Apps.store.models import ModelBase


class Cart(ModelBase):
    user = models.ForeignKey('Accounts.User', on_delete=models.CASCADE, verbose_name='Usuario')
    products = models.ManyToManyField('Product', through='CartProduct', verbose_name='Productos')
    state = models.BooleanField(default=True, verbose_name='Estado')

    def __str__(self):
        return f"Carrito de {self.user.username}"

    def to_json(self, request=None):
        item = model_to_dict(self)
        item['product'] = self.products.name
        item["quantity"] = self.cartproduct_set.quantity
        item["price"] = self.products.price
        return item

    class Meta:
        verbose_name = 'Carrito'
        verbose_name_plural = 'Carritos'
        ordering = ['id']


class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1, verbose_name='Cantidad')

    def __str__(self):
        return f"{self.product} - {self.quantity}"

    def to_json(self, request=None):
        item = model_to_dict(self)
        item['product'] = self.product.name
        item['product_id'] = self.product.id
        item["name_startup"] = self.product.start_up.name
        item["phone_owner"] = self.product.start_up.owner.phone
        item["image_product"] = self.product.get_image_url(request=request)
        item["quantity"] = self.quantity
        item["price"] = float(self.product.price)
        return item

    class Meta:
        verbose_name = 'Producto en Carrito'
        verbose_name_plural = 'Productos en Carrito'
        ordering = ['id']


class OrderHistory(ModelBase):
    user = models.ForeignKey('Accounts.User', on_delete=models.CASCADE, verbose_name='Usuario')
    products = models.ManyToManyField('Product', through='OrderProduct', verbose_name='Productos')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio Total')
    order_date = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Pedido')

    def __str__(self):
        return f"Pedido de {self.user.username} - {self.order_date.strftime('%Y-%m-%d %H:%M:%S')}"

    class Meta:
        verbose_name = 'Historial de Pedido'
        verbose_name_plural = 'Historial de Pedidos'
        ordering = ['order_date']


class OrderProduct(models.Model):
    order = models.ForeignKey(OrderHistory, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} - {self.quantity} (Precio: {self.price_at_purchase})"
