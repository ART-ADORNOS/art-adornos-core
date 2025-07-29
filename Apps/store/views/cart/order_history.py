from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Apps.store.serializer.cart.OrderHistorySerializer import OrderHistorySerializer


class RegisterOrderHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = OrderHistorySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
