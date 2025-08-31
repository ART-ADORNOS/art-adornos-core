from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Apps.store.api.order.serializers.order_detail import OrderItemSerializerOut
from Apps.store.models import Order


class ListOrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id, *args, **kwargs):
        user = request.user
        try:
            order = Order.objects.get(id=order_id, customer=user)
            order_items = order.items.all()
        except Order.DoesNotExist:
            return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrderItemSerializerOut(order_items, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
