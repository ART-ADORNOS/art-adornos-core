import logging

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.store.api.startup.serializers.startup import StartupAPISerializer
from core.store.models import Startup

logger = logging.getLogger(__name__)


class AllStartupsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        startups = Startup.objects.all()
        serializer = StartupAPISerializer(startups, many=True)
        return Response(serializer.data)
