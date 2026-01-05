from django.urls import path

from core.Accounts.api.v1.user import UserDeleteView, RegisterUserView, UpdateUserView, GetUserView

urlpatterns = [
    path('delete/', UserDeleteView.as_view(), name='delete_user'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('update/', UpdateUserView.as_view(), name='user_update'),
    path('me/', GetUserView.as_view(), name='get_user'),

]
