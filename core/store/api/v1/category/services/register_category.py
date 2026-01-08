from django.db import transaction

from core.store.models import Category


class RegisterCategoryService:

    @staticmethod
    @transaction.atomic
    def execute(user: object, category_data: dict) -> Category:
        category = Category.objects.create(created_by=user, **category_data)

        return category
