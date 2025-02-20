from django.urls import path
from Apps.store.views import RegisterStartupView, IndustryChoicesView

app_name = 'store'
urlpatterns = []

urlpatterns += [
    # Startup
    path('startups/register/', RegisterStartupView.as_view(), name='register_startup'),
    path('api/industry-choices/', IndustryChoicesView.as_view(), name='industry-choices'),

]
