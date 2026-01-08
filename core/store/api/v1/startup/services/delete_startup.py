from django.db import transaction

from core.store.models import Startup


class DeleteStartupService:

    @staticmethod
    @transaction.atomic
    def execute(startup_id : int) -> Startup:
        startup = Startup.objects.get(id=startup_id)
        if not startup:
            raise Startup.DoesNotExist("Startup not found")

        startup.delete()

        return startup
