from django.urls import path
from Apps.store.api.startup.views.startups import StartupListView

urlpatterns = [
    path('list', StartupListView.as_view(), name='api_startup_list'),
]
