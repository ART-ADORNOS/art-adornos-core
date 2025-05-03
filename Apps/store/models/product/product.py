from django.db import models
from ..startup.startup import ModelBase


class Product(ModelBase):
    start_up = models.ForeignKey('Startup', on_delete=models.CASCADE, verbose_name='Startup')
    name = models.CharField(max_length=255, verbose_name='Nombre')
    description = models.TextField(verbose_name='Descripción', blank=True)
    image = models.ImageField(upload_to='products/', verbose_name='Imagen', blank=True)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, verbose_name='Categoría')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio')
    stock = models.IntegerField(verbose_name='Stock')
    state = models.BooleanField(default=True, verbose_name='Estado')

    def __str__(self):
        return self.name

    def delete(self, *args, **kwargs):
        if self.image:
            self.image.delete()
        super().delete(*args, **kwargs)

    def get_image_url(self, request=None):
        image_url = self.image.url if self.image else None
        if image_url and request:
            image_url = request.build_absolute_uri(image_url)
        return image_url

    def to_json(self, request=None):
        image_url = self.get_image_url(request=request)
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': image_url,
            'category': self.category.name,
            'price': self.price,
            'stock': self.stock,
            'state': self.state
        }

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['id']
