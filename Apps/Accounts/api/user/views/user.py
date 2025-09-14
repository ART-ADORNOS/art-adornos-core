import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Apps.store.utils.constants import Messages

logger = logging.getLogger(__name__)


class UserDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        try:
            user = request.user
            if not user.is_active:
                logger.error('User %s is deactivated.' % user.name)
                return Response({"error": "User not found or already deactivated"}, status=status.HTTP_404_NOT_FOUND)
            user.delete()
            logger.info(f"User {user.name} deleted successfully.")
            return Response({"result": "user delete successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error deleting user: {e}")
            return Response({Messages.INTERNAL_ERROR_MSG},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
