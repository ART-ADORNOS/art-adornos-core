from django.urls import path

from Apps.store.api import IndustryListView

urlpatterns = [
    path('list/', IndustryListView.as_view(), name='industry-choices'),
]
