from django.db import transaction

from core.store.models import Product


class DeleteProductService:

    @staticmethod
    @transaction.atomic
    def execute(product_id: int) -> Product:
        product = Product.objects.get(id=product_id)
        if not product:
            raise Product.DoesNotExist("Product not found")

        product.delete()

        return product
