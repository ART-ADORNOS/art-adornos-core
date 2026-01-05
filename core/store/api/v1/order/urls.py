from django.urls import path

from core.store.api import RegisterOrderView, ListOrdersView, ListOrderDetailView

urlpatterns = [
    path('register/', RegisterOrderView.as_view(), name='register_order'),
    path('list/', ListOrdersView.as_view(), name='list_orders'),
    path('detail/<int:order_id>/', ListOrderDetailView.as_view(), name='list_detail'),
]
