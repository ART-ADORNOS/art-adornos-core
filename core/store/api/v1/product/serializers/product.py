from rest_framework import serializers

from core.store.models import Product


class ProductInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, instance):
        return instance.to_json_api(request=self.context.get('request'))
