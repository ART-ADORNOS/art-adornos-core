from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('user/', include('core.Accounts.api.v1.user.urls')),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

]
