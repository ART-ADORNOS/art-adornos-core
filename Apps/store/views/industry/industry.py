from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Apps.store.utilities.enums.industry import Industry


class IndustryListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        industries = [code for code, _ in Industry.choices]
        return Response({"industries": industries})
