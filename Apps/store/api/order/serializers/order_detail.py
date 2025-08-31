from rest_framework import serializers

from Apps.store.models import OrderItem


class OrderItemSerializerOut(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

    def to_representation(self, instance):
        return instance.to_json_api()
