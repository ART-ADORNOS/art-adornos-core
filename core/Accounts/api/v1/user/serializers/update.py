from rest_framework import serializers

from core.Accounts.models import User


class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name',
            'phone', 'address',
            'city', 'country',
            'password', 'confirm_password'
        ]

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if password or confirm_password:
            if password != confirm_password:
                raise serializers.ValidationError(
                    {"password": "Las contraseñas no coinciden"}
                )
        return data
