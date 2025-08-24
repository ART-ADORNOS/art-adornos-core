from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from Apps.store.api.order.features.order import OrderFeature


class RegisterOrderViewFeature(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = OrderFeature(request).register_order()
        return response
