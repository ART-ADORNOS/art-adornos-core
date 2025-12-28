from rest_framework import serializers

from core.store.models import OrderItem


class OrderItemSerializerOut(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

    def to_representation(self, instance):
        request = self.context.get('request')
        return instance.to_json_api(request=request)
