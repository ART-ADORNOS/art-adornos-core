from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Apps.store.models import CartProduct, Cart, Product
from Apps.store.serializer.cart.cart import CartSerializer


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
            cart_products = CartProduct.objects.filter(cart=cart)
            serializer = CartSerializer(cart_products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"message": "El carrito está vacío."}, status=status.HTTP_404_NOT_FOUND)


class RegisterCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            product_id = serializer.validated_data['product_id']
            quantity = serializer.validated_data['quantity']
            product = Product.objects.get(id=product_id)
            cart, _ = Cart.objects.get_or_create(user=user)
            cart_product, created = CartProduct.objects.get_or_create(cart=cart, product=product)
            if created:
                cart_product.quantity = quantity
            else:
                cart_product.quantity += quantity
            cart_product.save()
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteCartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
            cart.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
