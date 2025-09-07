import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Apps.store.models import Startup
from Apps.store.utilities.enums.industry import Industry

logger = logging.getLogger(__name__)


class IndustryListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            industries = [{"value": code, "label": label} for code, label in Industry.choices]
            logger.info(f"Industries fetched: {industries}")
            return Response({"industries": industries})
        except Exception as e:
            logger.error(str(e))
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserIndustryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        industries = Startup.objects.filter(owner=request.user).values_list('industry', flat=True).distinct()
        unique_industries = set(industries)
        industries_with_labels = []
        for ind_value in unique_industries:
            industries_with_labels.append({
                'value': ind_value,
                'label': Industry(ind_value).label
            })
        return Response({"industries": industries_with_labels})
