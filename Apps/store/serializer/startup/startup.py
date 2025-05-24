from rest_framework import serializers

from Apps.store.models import Startup
from Apps.store.utilities.enums.industry import Industry


class StartupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Startup
        fields = ['id', 'owner', 'name', 'description', 'industry']

    def to_internal_value(self, data):
        data = data.copy()

        industry_label = data.get('industry')
        if industry_label:
            industry_value = Industry.get_value(industry_label)
            if not industry_value:
                raise serializers.ValidationError({
                    'industry': f'Industria no válida: {industry_label}'
                })
            data['industry'] = industry_value

        return super().to_internal_value(data)
