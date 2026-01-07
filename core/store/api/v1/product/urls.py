from django.urls import path

from core.store.api.v1.product import ProductListAPIView, RegisterProductAPIView, ProductUpdateAPIView, \
    ProductDeleteAPIView, \
    ProductDetailAPIView

urlpatterns = [
    path('list/<int:startup_id>', ProductListAPIView.as_view(), name='list_product'),
    path('register/', RegisterProductAPIView.as_view(), name='register_product'),
    path('update/<int:product_id>', ProductUpdateAPIView.as_view(), name='update_product'),
    path('delete/<int:product_id>', ProductDeleteAPIView.as_view(), name='delete_product'),
    path('detail/<int:product_id>', ProductDetailAPIView.as_view(), name='get_product'),

]
