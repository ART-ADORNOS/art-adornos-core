from django.db import transaction

from core.store.models import Product


class UpdateProductService:

    @staticmethod
    @transaction.atomic
    def execute(product: Product, data: dict) -> Product:
        for attr, value in data.items():
            setattr(product, attr, value)

        product.save()

        return product
