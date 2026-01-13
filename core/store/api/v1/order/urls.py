from django.urls import path

from core.store.api.v1.order import RegisterOrderAPIView, ListOrdersAPIView, ListOrderDetailView

urlpatterns = [
    path('register', RegisterOrderAPIView.as_view(), name='register_order'),
    path('list', ListOrdersAPIView.as_view(), name='list_orders'),
    path('detail/<int:order_id>', ListOrderDetailView.as_view(), name='list_detail'),
]
