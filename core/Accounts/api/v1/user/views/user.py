import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from core.Accounts.api.v1.user.serializers import UserSerializer, UserDetailSerializer
from core.Accounts.api.v1.user.serializers.update import UserUpdateSerializer
from core.Accounts.api.v1.user.services import RegisterUserService, UpdateUserService, DeleteUserService
from core.store.utils.constants import Messages

logger = logging.getLogger(__name__)


class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = RegisterUserService.execute(serializer.validated_data)
        logger.info(f"User {user.username} registered successfully.")

        return Response({"message": Messages.USER_REGISTERED_SUCCESS}, status=status.HTTP_201_CREATED)


class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = UpdateUserService.execute(request.user, serializer.validated_data)
        logger.info(f"User {user.username} updated successfully.")

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = DeleteUserService.execute(request.user)
        logger.info(f"User {user.username} deleted successfully.")

        return Response({"result": "user deleted successfully"}, status=status.HTTP_200_OK)


class GetUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserDetailSerializer(user)
        logger.info(f"Retrieved user data for {user.username}.")

        return Response(serializer.data, status=status.HTTP_200_OK)
