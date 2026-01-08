import logging

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
        industries = Industry.to_api()
        response_data = {"industries": industries, }

        return Response(response_data, status=HTTP_200_OK)


class UserIndustryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        industries = GetUserIndustriesService.execute(request.user)
        response_data = {"industries": industries}

        return Response(response_data, status=HTTP_200_OK)
