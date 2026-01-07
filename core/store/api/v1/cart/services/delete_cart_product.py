from django.db import transaction

from core.store.models import CartProduct


class DeleteCartProductService:

    @staticmethod
    @transaction.atomic
    def execute(cart_product: CartProduct) -> None:
        cart_product.delete()
