from django.urls import path, include

urlpatterns = [
    path('user/', include('core.Accounts.api.user.urls')),
]
