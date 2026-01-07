from django.urls import path

from core.store.api.v1.cart import CartListAPIView, CartDeleteAPIView, CartProductDeleteAPIView

urlpatterns = [
    path('list/', CartListAPIView.as_view(), name='list_carts'),
    path('delete/<int:cart_id>', CartDeleteAPIView.as_view(), name='delete_cart'),
    path('delete-product/<int:cart_product_id>', CartProductDeleteAPIView.as_view(), name='delete_cart_product'),
]
