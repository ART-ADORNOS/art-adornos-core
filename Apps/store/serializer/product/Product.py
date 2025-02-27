from rest_framework import serializers
from Apps.store.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'start_up', 'name', 'description', 'category', 'price', 'stock', 'state']

