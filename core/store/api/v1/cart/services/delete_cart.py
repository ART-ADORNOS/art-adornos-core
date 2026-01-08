from django.db import transaction

from core.store.models import Cart


class DeleteCartService:

    @staticmethod
    @transaction.atomic
    def execute(user: object) -> Cart:
        cart = Cart.objects.filter(user=user).first()
        if not cart:
            raise Cart.DoesNotExist("Cart not found")

        cart.delete()

        return cart
