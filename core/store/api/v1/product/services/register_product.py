from django.db import transaction

from core.store.models import Product


class RegisterProductService:

    @staticmethod
    @transaction.atomic
    def execute(product_data: dict) -> Product:
        if not product_data.get("name"):
            raise ValueError("Product name is required.")

        if product_data.get("price") is None:
            raise ValueError("Product price is required.")

        product = Product.objects.create(**product_data)

        return product
