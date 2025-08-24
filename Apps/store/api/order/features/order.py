import logging

from django.db import transaction
from rest_framework import status
from rest_framework.response import Response

from Apps.store.models import Startup, Order, OrderItem

logger = logging.getLogger(__name__)


class OrderFeature:

    def __init__(self, request):
        self.request = request

    def register_order(self):
        try:
            with transaction.atomic():
                cart_id = self.request.data.get('cart')
                user = self.request.user
                startup_name = self.request.data.get('startup_name')
                order_items_data = self.request.data.get('items', [])

                total_amount = 0
                for item in order_items_data:
                    total_amount += item.get("quantity", 0) * item.get("price", 0)

                startup = Startup.objects.filter(name=startup_name).first()
                if not startup:
                    return Response({"error": f"Startup '{startup_name}' not found"},
                                    status=status.HTTP_404_NOT_FOUND)

                order = Order.objects.create(
                    customer=user,
                    cart_id=cart_id,
                    total_amount=total_amount,
                    startup=startup
                )

                order_items = [
                    OrderItem(
                        order=order,
                        product_id=item.get("product_id"),
                        quantity=item.get("quantity", 0),
                        price=item.get("price", 0)
                    )
                    for item in order_items_data
                ]
                OrderItem.objects.bulk_create(order_items)
                logger.info(f"Registered order '{order.name}' with ID {order.id}")
                return Response(status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.exception(f"Error in register_order: {e}")
            return Response(status=status.HTTP_400_BAD_REQUEST)
