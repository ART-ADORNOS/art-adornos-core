from django.urls import path, include

urlpatterns = [
    path('order/', include('Apps.store.api.order.urls')),
    path('product/', include('Apps.store.api.product.urls')),
    path('cart/', include('Apps.store.api.cart.urls')),
    path('category/', include('Apps.store.api.category.urls')),
]
