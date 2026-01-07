from rest_framework import serializers

from core.store.models import Order


class OrderOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    def to_representation(self, instance):
        return instance.to_json_api()
