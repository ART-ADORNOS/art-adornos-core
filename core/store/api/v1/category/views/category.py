import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.store.api.v1.category.serializers import CategoryOutputSerializer
from core.store.api.v1.category.services import DeleteCategoryService
from core.store.models import Category

logger = logging.getLogger(__name__)


class CategoryListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, startup_id):
        categories = Category.objects.filter(start_up_id=startup_id)

        if not categories.exists():
            logger.info(f"No categories found for startup_id={startup_id}")
            return Response([], status=status.HTTP_200_OK)

        serializer = CategoryOutputSerializer(categories, many=True)
        logger.info(f"Response data: {serializer.data}")

        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, category_id):
        category = Category.objects.get(id=category_id)

        if not category:
            return Response({"detail": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

        DeleteCategoryService.execute(category)
        logger.info(f"Deleted category id={category_id}")

        return Response(status=status.HTTP_204_NO_CONTENT)
