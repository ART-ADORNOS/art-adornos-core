import logging
from typing import cast, Iterable, Tuple, Any

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from core.store.api.v1.industry.services import GetUserIndustriesService
from core.store.utils.enums.industry import Industry

logger = logging.getLogger(__name__)


class IndustryListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        choices = getattr(Industry, "choices", ())
        industries = [
            {"value": key, "label": label}
            for key, label in choices
        ]
        response = {"industries": industries}

        return Response(response, status=HTTP_200_OK)


class UserIndustryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        industries = GetUserIndustriesService.execute(request.user)
        response_data = {"industries": industries}

        return Response(response_data, status=HTTP_200_OK)
