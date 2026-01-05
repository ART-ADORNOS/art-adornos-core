import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.store.api.v1.category.serializers import CategorySerializerOutput
from core.store.models import Category

logger = logging.getLogger(__name__)


class CategoryListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, startup_id):
        try:
            categories = Category.objects.filter(start_up_id=startup_id)
            serializer = CategorySerializerOutput(categories, many=True)
            logger.info(f"Response data: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(str(e))
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CategoryDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, category_id):
        try:
            category = Category.objects.get(id=category_id)
            category.delete()
            logger.info(f"Deleted category: {category}")
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(str(e))
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
