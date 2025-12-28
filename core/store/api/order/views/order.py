import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.store.api.order.features.order import OrderFeature
from core.store.api.order.serializers.order import OrderSerializerOut
from core.store.models import Order

logger = logging.getLogger(__name__)


class RegisterOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = OrderFeature(request).register_order()
        return response


class ListOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            orders = Order.objects.filter(customer=user).order_by('-id')
            serializer = OrderSerializerOut(orders, many=True)
            logger.info(f"Response data: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(str(e))
            return Response(status=status.HTTP_400_BAD_REQUEST)
