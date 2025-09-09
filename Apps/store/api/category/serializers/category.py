from rest_framework import serializers

from Apps.store.models import Category


class CategorySerializerOutput(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def to_representation(self, instance):
        return instance.to_json_api()
