from django.db import transaction

from core.store.models import CartProduct


class DeleteCartProductService:

    @staticmethod
    @transaction.atomic
    def execute(cart_product_id : int) -> None:
        cart_product = CartProduct.objects.get(id=cart_product_id)
        if not cart_product:
            raise CartProduct.DoesNotExist("Cart product not found")

        cart_product.delete()
