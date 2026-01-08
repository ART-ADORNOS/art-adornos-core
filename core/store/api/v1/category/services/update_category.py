from django.db import transaction

from core.store.models import Category


class UpdateCategoryService:

    @staticmethod
    @transaction.atomic
    def execute(category: Category, category_data: dict) -> Category:
        for field, value in category_data.items():
            setattr(category, field, value)
        category.save()

        return category
