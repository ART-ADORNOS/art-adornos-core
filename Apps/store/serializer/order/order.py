from rest_framework import serializers

from Apps.store.models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id', 'customer', 'cart', 'total_amount',
            'status', 'date_updated', 'hour_updated', 'startup'
        ]
