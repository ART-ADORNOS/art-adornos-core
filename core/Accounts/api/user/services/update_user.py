
from django.db import transaction

class UpdateUserService:

    @staticmethod
    @transaction.atomic
    def execute(user, data):
        data = data.copy()
        password = data.pop('password', None)
        data.pop('confirm_password', None)

        for attr, value in data.items():
            setattr(user, attr, value)

        if password:
            user.set_password(password)

        user.save()
        return user
