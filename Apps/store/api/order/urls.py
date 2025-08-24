from django.urls import path

from Apps.store.api import RegisterOrderViewFeature

urlpatterns = [
    path('register/', RegisterOrderViewFeature.as_view(), name='register_order'),
]
