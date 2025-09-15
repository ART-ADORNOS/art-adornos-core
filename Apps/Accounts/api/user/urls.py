from django.urls import path

from Apps.Accounts.api import UserDeleteView, RegisterUserView, UpdateUserView

urlpatterns = [
    path('delete/', UserDeleteView.as_view(), name='delete_user'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('update/', UpdateUserView.as_view(), name='user_update'),
]
