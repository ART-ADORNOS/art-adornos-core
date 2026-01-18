import logging

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from core.store.api.v1.product import ProductInputSerializer, ProductOutputSerializer
from core.store.api.v1.product.services import RegisterProductService, UpdateProductService, DeleteProductService
from core.store.models import Product
from core.store.utils.constants import Messages

logger = logging.getLogger(__name__)


class ProductListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, startup_id):
        products = Product.objects.filter(start_up_id=startup_id)
        if not products.exists():
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        serializer = ProductInputSerializer(products, many=True, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)


class RegisterProductAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ProductInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        RegisterProductService.execute(serializer.validated_data)

        return Response({"message": Messages.PRODUCT_REGISTERED_SUCCESS}, status=status.HTTP_201_CREATED)


class ProductUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, product_id):
        product = get_object_or_404(Product, id=product_id)

        serializer = ProductInputSerializer(product, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)

        product = UpdateProductService.execute(product, serializer.validated_data)

        logger.info(f"Product {product.id} updated successfully.")

        return Response(ProductInputSerializer(product).data, status=status.HTTP_200_OK)


class ProductDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        DeleteProductService.execute(product_id)
        logger.info(f"Retrieved product data for product ID {product_id}.")

        return Response({"result": Messages.PRODUCT_DELETED_SUCCESS}, status=status.HTTP_200_OK)


class ProductDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, product_id):
        product = Product.objects.get(id=product_id)
        serializer = ProductOutputSerializer(product, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)
