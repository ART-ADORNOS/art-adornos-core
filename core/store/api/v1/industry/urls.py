from django.urls import path

from core.store.api import IndustryListView, UserIndustryView

urlpatterns = [
    path('list/', IndustryListView.as_view(), name='industry-choices'),
    path('user-industry/', UserIndustryView.as_view(), name='user-industry'),
]
