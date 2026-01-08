from django.db import transaction

from core.store.models import Startup


class RegisterStartupService:

    @staticmethod
    @transaction.atomic
    def execute(user: object, startup_data: dict) -> Startup:
        startup = Startup.objects.create(owner=user, **startup_data)

        return startup
