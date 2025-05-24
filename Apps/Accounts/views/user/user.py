import logging

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Apps.Accounts.serializer.user.user import UserSerializer

logger = logging.getLogger(__name__)


class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Usuario registrado con éxito."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        try:
            user = request.user
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error updating user: {e}")
            return Response({"error": "Ocurrio un error interno. Por favor, intente más tarde."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        try:
            user = request.user
            if not user.is_active:
                return Response({"error": "User not found or already deactivated"}, status=status.HTTP_404_NOT_FOUND)
            user.delete()
            return Response({"result": "user delete successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error deleting user: {e}")
            return Response({"error": "Ocurrio un error interno. Por favor, intente más tarde."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
