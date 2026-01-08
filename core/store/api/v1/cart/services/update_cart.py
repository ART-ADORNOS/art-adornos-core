from django.db import transaction

from core.store.models import Cart


class UpdateCartService:

    @staticmethod
    @transaction.atomic
    def execute(cart: Cart, cart_data: dict) -> None:
        for field, value in cart_data.items():
            setattr(cart, field, value)
        cart.save()
