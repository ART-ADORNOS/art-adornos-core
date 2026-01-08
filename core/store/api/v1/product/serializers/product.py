from rest_framework import serializers

from core.store.models import Product


class ProductInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'start_up', 'name', 'description', 'image', 'category', 'price', 'stock']


class ProductOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, instance):
        request = self.context.get('request')
        api_representation = instance.to_json_api(request=request)
        return api_representation
