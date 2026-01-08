import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.store.api.v1.order import OrderFeatureService, OrderOutputSerializer
from core.store.models import Order

logger = logging.getLogger(__name__)


class RegisterOrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = OrderFeatureService(request).register_order()
        return response


class ListOrdersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        orders = Order.objects.filter(customer=user).order_by('-id')
        serializer = OrderOutputSerializer(orders, many=True)
        logger.info(f"Response data: {serializer.data}")

        return Response(serializer.data, status=status.HTTP_200_OK)
