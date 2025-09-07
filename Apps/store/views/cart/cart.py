import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Apps.store.models import Cart
from Apps.store.serializer import CartSerializer

logger = logging.getLogger(__name__)


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
