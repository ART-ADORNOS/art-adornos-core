from rest_framework import serializers
from Apps.store.models import Startup


class StartupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Startup
        fields = ['owner', 'name', 'description', 'industry']