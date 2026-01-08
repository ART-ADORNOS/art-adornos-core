from django.db import transaction

from core.store.models import Category


class DeleteCategoryService:

    @staticmethod
    @transaction.atomic
    def execute(category_id: int) -> None:
        category = Category.objects.get(id=category_id)
        if not category:
            raise Category.DoesNotExist("Category not found")

        category.delete()
