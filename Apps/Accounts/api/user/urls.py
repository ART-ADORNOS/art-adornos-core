from django.urls import path

from Apps.Accounts.api import UserDeleteView

urlpatterns = [
    path('delete/', UserDeleteView.as_view(), name='delete_user'),
]
