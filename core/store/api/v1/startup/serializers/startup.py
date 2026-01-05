from rest_framework import serializers

from core.store.models import Startup


class StartupAPISerializer(serializers.ModelSerializer):
    class Meta:
        model = Startup
        fields = '__all__'

    def to_representation(self, instance):
        return instance.to_json_api()

