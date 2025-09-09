from rest_framework import serializers

from Apps.store.models import CartProduct


class CartSerializerOutput(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = '__all__'

    def to_representation(self, instance):
        request = self.context.get('request')
        return instance.to_json_api(request=request)
