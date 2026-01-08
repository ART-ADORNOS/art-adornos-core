import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.store.api.v1.cart import CartInputSerializer, RegisterCartService
from core.store.api.v1.cart.serializers import CartOutputSerializer
from core.store.api.v1.cart.services import DeleteCartService
from core.store.api.v1.cart.services.delete_cart_product import DeleteCartProductService
from core.store.api.v1.cart.services.update_cart import UpdateCartService
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


class RegisterCartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CartInputSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        cart = RegisterCartService.execute(request.user, serializer.validated_data)
        logger.info(f"Registered cart for user_id={request.user.id} with cart_id={cart.id}")

        return Response(CartOutputSerializer(cart).data, status=status.HTTP_201_CREATED)


class UpdateCartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        cart = Cart.objects.get(user=request.user)
        serializer = CartInputSerializer(cart, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        UpdateCartService.execute(cart, serializer.validated_data)
        logger.info(f"Updated cart id={cart.id} for user_id={request.user.id}")

        return Response(CartOutputSerializer(cart).data, status=status.HTTP_200_OK)


class CartDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        cart = DeleteCartService.execute(request.user)
        logger.info(f"Deleted cart for user_id={cart.user_id}")

        return Response(status=status.HTTP_204_NO_CONTENT)


class CartProductDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, cart_product_id):
        DeleteCartProductService.execute(cart_product_id)
        logger.info(f"Deleted cart product id={cart_product_id} for user_id={request.user.id}")

        return Response(status=status.HTTP_204_NO_CONTENT)
