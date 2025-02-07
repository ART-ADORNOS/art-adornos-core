from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Apps.Accounts.serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


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
            return Response({"error": str(e)}, status=500)


class UserDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        try:
            user = request.user
            if not user.is_active:
                return Response({"error": "User not found or already deactivated"}, status=404)
            user.delete()
            return Response({"result": "user delete successfully"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
