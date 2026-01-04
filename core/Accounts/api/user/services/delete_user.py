from django.db import transaction
from rest_framework.exceptions import NotFound

class DeleteUserService:

    @staticmethod
    @transaction.atomic
    def execute(user):
        if not user.is_active:
            raise NotFound("Usuario no encontrado o ya desactivado")

        user.delete()
        return user

