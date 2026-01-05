import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.store.api.v1.cart.serializers import CartSerializerOutput
from core.store.api.v1.cart.services import DeleteCartService
from core.store.models import CartProduct, Cart

logger = logging.getLogger(__name__)


class CartListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)

        cart_products = CartProduct.objects.filter(cart=cart)
        serializer = CartSerializerOutput(cart_products, many=True, context={"request": request},)

        return Response(serializer.data, status=status.HTTP_200_OK)



class DeleteCartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        cart = Cart.objects.filter(user=request.user).first()

        if not cart:
            return Response({"detail": "Cart not found"},status=status.HTTP_404_NOT_FOUND,)

        DeleteCartService.execute(cart)
        logger.info(f"Deleted cart for user_id={cart.user_id}")

        return Response(status=status.HTTP_204_NO_CONTENT)



class DeleteCartProductView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, cart_product_id):
        try:
            cart_product = CartProduct.objects.get(id=cart_product_id)
            cart_product.delete()
            logger.info(f"Deleted cart product: {cart_product}")
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(str(e))
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
