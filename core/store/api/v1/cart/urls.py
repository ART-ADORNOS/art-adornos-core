from django.urls import path

from core.store.api.v1.cart import CartListView, DeleteCartView, DeleteCartProductView

urlpatterns = [
    path('list/', CartListView.as_view(), name='list_carts'),
    path('delete/<int:cart_id>', DeleteCartView.as_view(), name='delete_cart'),
    path('delete-product/<int:cart_product_id>', DeleteCartProductView.as_view(), name='delete_cart_product'),
]
