from rest_framework import serializers

from Apps.store.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'start_up', 'name', 'description', 'image', 'category', 'price', 'stock']

    def to_representation(self, instance):
        return instance.to_json_api(request=self.context.get('request'))
