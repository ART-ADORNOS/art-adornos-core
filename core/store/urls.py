from django.urls import path, include

app_name = 'store'
urlpatterns = []

urlpatterns += [
    # Api
    path('api/', include('core.store.api.v1.urls'))
]
