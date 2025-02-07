from django.urls import path
from Apps.Accounts.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = 'accounts'
urlpatterns = []

urlpatterns += [
    # User
    path('register/', RegisterUserView.as_view(), name='register'),
    path('update/', UpdateUserView.as_view(), name='user_update'),
    path('delete/', UserDeleteView.as_view(), name='delete'),

    # Api
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/me/', GetUserView.as_view(), name='get_user'),

    # RegisterSellerView
    path('register/seller/', RegisterSellerView.as_view(), name='register_seller'),
]
