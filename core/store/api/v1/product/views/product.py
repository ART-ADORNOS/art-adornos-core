import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from core.store.api.v1.product import ProductInputSerializer
from core.store.models import Product
from core.store.utils.constants import Messages

logger = logging.getLogger(__name__)


class ProductListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, startup_id):
        products = Product.objects.filter(start_up_id=startup_id)
        if not products.exists():
            return Response({"error": Messages.PRODUCT_NOT_FOUND}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductInputSerializer(products, many=True, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)


# TODO : Add transaction management
class RegisterProductAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ProductInputSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            serializer = ProductInputSerializer(product, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error updating product: {e}")
            return Response({"error": Messages.INTERNAL_ERROR_MSG},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProductDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            product.delete()
            return Response({"result": Messages.PRODUCT_DELETED_SUCCESS}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error deleting product: {e}")
            return Response({"error": Messages.INTERNAL_ERROR_MSG},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProductDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            serializer = ProductInputSerializer(product, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error getting product detail: {e}")
            return Response({"error": Messages.INTERNAL_ERROR_MSG},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
