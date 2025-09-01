from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Apps.store.api.order.features.order import OrderFeature
from Apps.store.api.order.serializers.order import OrderSerializerOut
from Apps.store.models import Order


class RegisterOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = OrderFeature(request).register_order()
        return response


class ListOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        orders = Order.objects.filter(customer=user).order_by('-id')
        serializer = OrderSerializerOut(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
