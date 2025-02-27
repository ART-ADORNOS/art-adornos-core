from django.urls import path
from Apps.store.views import (RegisterStartupView, IndustryChoicesView
                        , GetStartupView,RegisterProductView, RegisterCategoryView)


app_name = 'store'
urlpatterns = []

urlpatterns += [
    # Startup
    path('startups/register/', RegisterStartupView.as_view(), name='register_startup'),
    path('api/industry-choices/', IndustryChoicesView.as_view(), name='industry-choices'),
    path('api/startups/list/', GetStartupView.as_view(), name='get_startup'),

    # Product
    path('products/register/', RegisterProductView.as_view(), name='register_product'),

    # Category
    path('category/register/', RegisterCategoryView.as_view(), name='register_category'),


]
