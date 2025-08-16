import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Apps.store.models import CartProduct, Cart
from Apps.store.serializer import CartSerializer

logger = logging.getLogger(__name__)


class CartListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
            cart_products = CartProduct.objects.filter(cart=cart)
            data = [product.to_json(request=request) for product in cart_products]
            return Response(data, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RegisterCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CartSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateCartView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
            serializer = CartSerializer(cart, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Cart.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class DeleteCartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
            cart.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error deleting cart: {e}")
            return Response({"error", "Ocurrio un error interno. Por favor, intente más tarde."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteCartProductView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, cart_product_id):
        try:
            cart_product = CartProduct.objects.get(id=cart_product_id)
            cart_product.delete()
            return Response(status=status.HTTP_200_OK)
        except CartProduct.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
