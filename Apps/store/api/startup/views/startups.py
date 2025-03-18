from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from Apps.store.api.startup.serializer.startups import StartupSerializer
from Apps.store.models import Startup


class StartupListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        startups = Startup.objects.all()
        serializer = StartupSerializer(startups, many=True)
        return Response(serializer.data)
