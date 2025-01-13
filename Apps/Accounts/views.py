from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from Apps.Accounts.models import User, Audit
from Apps.Accounts.serializers import UserSerializer, AuditLogSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
import logging

# Registrar Ip y user agent
logger = logging.getLogger(__name__)

class RegisterUserView(APIView):
    def post(self, request):
        print("Datos recibidos:", request.data)  

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Registrar datos de auditoría
            Audit.objects.create(
                user=user,
                ip_address=self.get_client_ip(request),
                user_agent=request.META.get('HTTP_USER_AGENT', '')
            )
            return Response({"message": "Usuario registrado con éxito."}, status=status.HTTP_201_CREATED)
        print("Errores del serializador:", serializer.errors) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

# Vista para obtener datos de auditoría (solo para usuarios autenticados)
class AuditLogAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        audit_log = Audit.objects.get(user=request.user)
        serializer = AuditLogSerializer(audit_log)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

