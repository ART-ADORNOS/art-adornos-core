from rest_framework import serializers

from core.store.models import Category


class CategoryOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def to_representation(self, instance):
        return instance.to_json_api()


class CategoryInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'state', 'start_up']
