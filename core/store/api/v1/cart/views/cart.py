import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.store.api.v1.cart.serializers import CartOutputSerializer
from core.store.api.v1.cart.services import DeleteCartService
from core.store.api.v1.cart.services.delete_cart_product import DeleteCartProductService
from core.store.models import CartProduct, Cart

logger = logging.getLogger(__name__)


class CartListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)

        cart_products = CartProduct.objects.filter(cart=cart)
        serializer = CartOutputSerializer(cart_products, many=True, context={"request": request}, )

        return Response(serializer.data, status=status.HTTP_200_OK)


class CartDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        cart = Cart.objects.filter(user=request.user).first()

        if not cart:
            return Response({"detail": "Cart not found"}, status=status.HTTP_404_NOT_FOUND, )

        DeleteCartService.execute(cart)
        logger.info(f"Deleted cart for user_id={cart.user_id}")

        return Response(status=status.HTTP_204_NO_CONTENT)


class CartProductDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, cart_product_id):
        try:
            cart_product = CartProduct.objects.get(id=cart_product_id)
        except CartProduct.DoesNotExist:
            return Response({"detail": "Cart product not found"}, status=status.HTTP_404_NOT_FOUND)

        DeleteCartProductService.execute(cart_product)
        logger.info(f"Deleted cart product id={cart_product_id} for user_id={request.user.id}")

        return Response(status=status.HTTP_204_NO_CONTENT)
