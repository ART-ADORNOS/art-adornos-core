from django.db import transaction

from core.store.models import Startup


class UpdateStartupService:

    @staticmethod
    @transaction.atomic
    def execute(startup: Startup, startup_data: dict) -> Startup:
        for field, value in startup_data.items():
            setattr(startup, field, value)
        startup.save()

        return startup
