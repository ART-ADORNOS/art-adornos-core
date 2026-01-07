from django.db import transaction

from core.store.models import Cart


class DeleteCartService:

    @staticmethod
    @transaction.atomic
    def execute(cart: Cart) -> None:
        cart.delete()
