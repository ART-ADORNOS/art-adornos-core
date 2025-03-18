from django.urls import include, path

urlpatterns = [
    path('startup/', include('Apps.store.api.startup.urls')),
]
