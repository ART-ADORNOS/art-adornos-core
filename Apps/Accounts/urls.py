from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from Apps.Accounts.views import GetUserView

app_name = 'accounts'
urlpatterns = []

urlpatterns += [
    # Api
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/me/', GetUserView.as_view(), name='get_user'),

    path('api/', include('Apps.Accounts.api.urls'))
]
