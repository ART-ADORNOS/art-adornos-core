from django.urls import path

from core.Accounts.api.v1.user import UserDeleteAPIView, RegisterUserAPIView, UpdateUserAPIView, GetUserAPIView

urlpatterns = [
    path('me/', GetUserAPIView.as_view(), name='get_user'),
    path('register/', RegisterUserAPIView.as_view(), name='register'),
    path('update/', UpdateUserAPIView.as_view(), name='user_update'),
    path('delete/', UserDeleteAPIView.as_view(), name='delete_user')
]
