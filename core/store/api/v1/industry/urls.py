from django.urls import path

from core.store.api.v1.industry import IndustryListAPIView, UserIndustryAPIView

urlpatterns = [
    path('list', IndustryListAPIView.as_view(), name='industry-choices'),
    path('user-industry', UserIndustryAPIView.as_view(), name='user-industry'),
]
