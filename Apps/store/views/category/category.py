import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Apps.store.models import Category
from Apps.store.serializer.category.category import CategorySerializer
from Apps.store.utils.constants import Messages

logger = logging.getLogger(__name__)


class CategoryListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, startup_id):
        categories = Category.objects.filter(start_up_id=startup_id)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


class RegisterCategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, category_id):
        try:
            category = Category.objects.get(id=category_id)
            serializer = CategorySerializer(category, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error updating category: {e}")
            return Response({"error": Messages.INTERNAL_ERROR_MSG},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CategoryDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, category_id):
        try:
            category = Category.objects.get(id=category_id)
            category.delete()
            return Response({"result": "category delete successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error deleting category: {e}")
            return Response({"error": Messages.INTERNAL_ERROR_MSG},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
