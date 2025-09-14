from django.urls import path, include

urlpatterns = [
    path('user/', include('Apps.Accounts.api.user.urls')),

]
