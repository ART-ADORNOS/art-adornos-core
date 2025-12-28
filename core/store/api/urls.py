from django.urls import path, include

urlpatterns = [
    path('order/', include('core.store.api.order.urls')),
    path('product/', include('core.store.api.product.urls')),
    path('cart/', include('core.store.api.cart.urls')),
    path('category/', include('core.store.api.category.urls')),
    path('industry/', include('core.store.api.industry.urls')),
]
