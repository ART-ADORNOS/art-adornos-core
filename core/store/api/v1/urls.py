from django.urls import path, include

urlpatterns = [
    path('order/', include('core.store.api.v1.order.urls')),
    path('product/', include('core.store.api.v1.product.urls')),
    path('cart/', include('core.store.api.v1.cart.urls')),
    path('category/', include('core.store.api.v1.category.urls')),
    path('industry/', include('core.store.api.v1.industry.urls')),
]
