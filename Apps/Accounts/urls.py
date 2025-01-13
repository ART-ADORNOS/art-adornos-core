from django.urls import path
from Apps.Accounts.views import RegisterUserView, AuditLogAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


app_name = 'accounts'
urlpatterns = []

urlpatterns += [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('audit-log/', AuditLogAPIView.as_view(), name='audit'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]