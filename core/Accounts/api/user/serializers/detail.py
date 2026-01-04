from rest_framework import serializers

from core.Accounts.models import User


class UserDetailSerializer(serializers.ModelSerializer):
    model = User
    fields = '__all__'

    def to_representation(self, instance):
        request = self.context.get('request')
        return instance.to_json_api(request=request)