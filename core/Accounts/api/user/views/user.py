import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from core.Accounts.api.user.serializers.user import UserSerializer
from core.store.utils.constants import Messages

logger = logging.getLogger(__name__)


class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                logger.info(f"User {serializer.data.get('username')} registered successfully.")

                return Response({"message": Messages.USER_REGISTERED_SUCCESS}, status=status.HTTP_201_CREATED)

            logger.error(f'User registration failed: {serializer.errors}')
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(str(e))
            return Response({"error": Messages.INTERNAL_ERROR_MSG}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        try:
            user = request.user
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                logger.info(f"User {user.username} updated successfully.")
                return Response(serializer.data, status=status.HTTP_200_OK)

            logger.error({"error": serializer.errors})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(str(e))
            return Response({"error": Messages.INTERNAL_ERROR_MSG}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        try:
            user = request.user
            if not user.is_active:
                logger.error('User %s is deactivated.' % user.username)
                return Response({"error": "User not found or already deactivated"}, status=status.HTTP_404_NOT_FOUND)

            user.delete()
            logger.info(f"User {user.username} deleted successfully.")

            return Response({"result": "user delete successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error deleting user: {e}")
            return Response({Messages.INTERNAL_ERROR_MSG}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        data = serializer.data
        logger.info(f"Retrieved user data for {user.username}.")

        return Response(data, status=status.HTTP_200_OK)


