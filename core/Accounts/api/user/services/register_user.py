from django.db import transaction

from core.Accounts.models import User


class RegisterUserService:

    @staticmethod
    @transaction.atomic
    def execute(data: dict) -> User:
        data = data.copy()
        data.pop('confirm_password', None)

        user = User.objects.create_user(**data)

        return user