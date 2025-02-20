from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from Apps.store.serializer.startup.startup import StartupSerializer
from Apps.store.utilities.enums.industry import Industry


class IndustryChoicesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(Industry.choices)


class RegisterStartupView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = StartupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
