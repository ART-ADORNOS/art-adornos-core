from django.urls import path

from core.store.api.v1.product import ProductListView, RegisterProductView, ProductUpdateView, ProductDeleteView, \
    ProductDetailView

urlpatterns = [
    path('list/<int:startup_id>', ProductListView.as_view(), name='list_product'),
    path('register/', RegisterProductView.as_view(), name='register_product'),
    path('update/<int:product_id>', ProductUpdateView.as_view(), name='update_product'),
    path('delete/<int:product_id>', ProductDeleteView.as_view(), name='delete_product'),
    path('detail/<int:product_id>', ProductDetailView.as_view(), name='get_product'),
]
