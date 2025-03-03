from django.urls import path

from Apps.store.views import (RegisterStartupView, IndustryListView,
                              UserStartupsListView, RegisterProductView, RegisterCategoryView, CategoryListView,
                              ProductListView)

app_name = 'store'
urlpatterns = []

urlpatterns += [
    # Startup
    path('startups/register/', RegisterStartupView.as_view(), name='register_startup'),
    path('api/industry-choices/', IndustryListView.as_view(), name='industry-choices'),
    path('api/startups/list/', UserStartupsListView.as_view(), name='get_startup'),

    # Product
    path('products/register/', RegisterProductView.as_view(), name='register_product'),
    path('api/products/list/<int:startup_id>', ProductListView.as_view(), name='get_product'),

    # Category
    path('category/register/', RegisterCategoryView.as_view(), name='register_category'),
    path('api/category/list/<int:startup_id>', CategoryListView.as_view(), name='get_category'),

]
