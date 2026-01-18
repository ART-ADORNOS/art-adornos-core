from rest_framework import serializers

from core.store.models import Startup
from core.store.utils.enums.industry import Industry


class StartupOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Startup
        fields = '__all__'

    def to_representation(self, instance):
        return instance.to_json_api()


class StartupInputSerializer(serializers.ModelSerializer):
    industry = serializers.CharField()

    class Meta:
        model = Startup
        fields = ['id', 'name', 'description', 'industry', "icon"]

    def validate_industry(self, value):
        if value in Industry.values:
            return value

        key = Industry.get_value(value)
        if key:
            return key

        raise serializers.ValidationError(f"Invalid industry: {value}")
