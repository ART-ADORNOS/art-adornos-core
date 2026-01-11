from rest_framework import serializers

from core.Accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username', 'email',
            'password', 'confirm_password',
            'first_name', 'last_name',
            'phone', 'address', 'city',
            'country', 'is_seller'
        ]

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"non_field_errors": ["Las contraseñas no coinciden"]})
        return data
