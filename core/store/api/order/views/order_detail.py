import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.store.api.order.serializers import OrderItemSerializerOut
from core.store.models import Order

logger = logging.getLogger(__name__)


class ListOrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id, *args, **kwargs):
        user = request.user
        try:
            order = Order.objects.get(id=order_id, customer=user)
            order_items = order.items.all()
            serializer = OrderItemSerializerOut(order_items, many=True, context={'request': request})
            logger.info(f"Response data: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(str(e))
            return Response(status=status.HTTP_404_NOT_FOUND)
