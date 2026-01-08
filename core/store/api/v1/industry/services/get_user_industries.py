from core.store.models import Startup
from core.store.utils.enums.industry import Industry


class GetUserIndustriesService:

    @staticmethod
    def execute(user):
        industry_values = (Startup.objects.filter(owner=user).values_list("industry", flat=True).distinct())
        response = [
            {
                "value": industry,
                "label": Industry.get_label(industry),
            }
            for industry in industry_values
        ]

        return response
