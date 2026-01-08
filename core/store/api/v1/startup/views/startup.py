import logging

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from core.store.api.v1.startup import StartupOutputSerializer, StartupInputSerializer
from core.store.api.v1.startup.services import RegisterStartupService, UpdateStartupService
from core.store.api.v1.startup.services.delete_startup import DeleteStartupService
from core.store.models import Startup
from core.store.utils.constants import Messages

logger = logging.getLogger(__name__)


class AllStartupsListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        startups = Startup.objects.all()
        serializer = StartupOutputSerializer(startups, many=True)
        logger.info("Retrieved all startups: %d found", startups.count())

        return Response(serializer.data, status=HTTP_200_OK)


class UserStartupsListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        startup = request.user.startups.all()
        serializer = StartupOutputSerializer(startup, many=True)
        logger.info("Retrieved startups for user %s: %d found", request.user.id, startup.count())

        return Response(serializer.data, status=HTTP_200_OK)


class RegisterStartupAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = StartupInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        startup = RegisterStartupService.execute(request.user, serializer.validated_data)

        logger.info("Startup %s registered successfully for user %s", startup.id, request.user.id)

        return Response(StartupOutputSerializer(startup).data, status=HTTP_200_OK)


class StartupUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, startup_id):
        startup = request.user.startups.get(id=startup_id)
        serializer = StartupInputSerializer(startup, data=request.data)
        serializer.is_valid(raise_exception=True)

        UpdateStartupService.execute(startup, serializer.validated_data)
        logger.info("Startup %s updated successfully for user %s", startup.id, request.user.id)

        return Response(StartupOutputSerializer(startup).data, status=HTTP_200_OK)


class StartupDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, startup_id):
        DeleteStartupService.execute(startup_id)
        logger.info("Startup %s deleted successfully for user %s", startup_id, request.user.id)

        return Response({"message": Messages.STARTUP_DELETED_SUCCESS}, status=HTTP_200_OK)
