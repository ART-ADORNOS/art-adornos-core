from django.db import transaction

from core.store.models import Category


class DeleteCategoryService:

    @staticmethod
    @transaction.atomic
    def execute(category: Category) -> None:
        category.delete()
