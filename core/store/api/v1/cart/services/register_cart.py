from django.db import transaction

from core.store.models import Cart


class RegisterCartService:

    @staticmethod
    @transaction.atomic
    def execute(user: object, cart_data: dict) -> Cart:
        cart = Cart.objects.create(user=user, **cart_data)

        return cart
