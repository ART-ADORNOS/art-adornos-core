import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Apps.store.models import Startup
from Apps.store.serializer.startup.startup import StartupSerializer
from Apps.store.utilities.enums.industry import Industry

logger = logging.getLogger(__name__)


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


class UserStartupsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        startup = request.user.startups.all()
        serializer = StartupSerializer(startup, many=True)
        return Response(serializer.data)


class RegisterStartupView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)
        serializer = StartupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StartupUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, startup_id):
        try:
            startup = request.user.startups.get(id=startup_id)
            serializer = StartupSerializer(startup, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error updating startup: {e}")
            return Response({"error": "Ocurrio un error interno. Por favor, intente más tarde."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class StartupDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, startup_id):
        try:
            startup = request.user.startups.get(id=startup_id)
            startup.delete()
            return Response({"result": "startup delete successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error deleting startup: {e}")
            return Response({"error": "Ocurrio un error interno. Por favor, intente más tarde."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# API
class AllStartupsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        startups = Startup.objects.all()
        serializer = StartupSerializer(startups, many=True)
        return Response(serializer.data)
