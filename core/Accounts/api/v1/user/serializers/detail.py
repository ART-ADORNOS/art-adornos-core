from rest_framework import serializers

from core.Accounts.models import User


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def to_representation(self, instance):
        return instance.to_api_dict()