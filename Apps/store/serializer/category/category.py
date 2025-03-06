from rest_framework import serializers
from Apps.store.models import Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'state', 'start_up']
