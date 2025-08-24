from django.urls import path, include

urlpatterns = [
    path('order/', include('Apps.store.api.order.urls')),
]
