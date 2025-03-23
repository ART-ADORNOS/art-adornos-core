from django.urls import path

from Apps.store.views import (RegisterStartupView, IndustryListView,
                              UserStartupsListView, RegisterProductView, RegisterCategoryView, CategoryListView,
                              ProductListView, ProductDeleteView, ProductUpdateView, UserIndustryView,
                              CategoryDeleteView, CategoryUpdateView, ProductDetailView)
from Apps.store.views import StartupUpdateView, \
    StartupDeleteView

app_name = 'store'
urlpatterns = []

urlpatterns += [
    # Api
    path('api/industry-choices/', IndustryListView.as_view(), name='industry-choices'),
    path('api/user-industry/', UserIndustryView.as_view(), name='user-industry'),

    # Startup
    path('startups/register/', RegisterStartupView.as_view(), name='register_startup'),
    path('api/startups/list/', UserStartupsListView.as_view(), name='get_startup'),
    path('api/startups/update/<int:startup_id>/', StartupUpdateView.as_view(), name='update_startup'),
    path('api/startups/delete/<int:startup_id>/', StartupDeleteView.as_view(), name='delete_startup'),

    # Product
    path('products/register/', RegisterProductView.as_view(), name='register_product'),
    path('api/products/list/<int:startup_id>', ProductListView.as_view(), name='list_product'),
    path('api/products/delete/<int:product_id>', ProductDeleteView.as_view(), name='delete_product'),
    path('api/products/update/<int:product_id>', ProductUpdateView.as_view(), name='update_product'),
    path('api/products/detail/<int:product_id>', ProductDetailView.as_view(), name='get_product'),

    # Category
    path('category/register/', RegisterCategoryView.as_view(), name='register_category'),
    path('api/category/list/<int:startup_id>', CategoryListView.as_view(), name='get_category'),
    path('api/category/update/<int:category_id>', CategoryUpdateView.as_view(), name='update_category'),
    path('api/category/delete/<int:category_id>', CategoryDeleteView.as_view(), name='delete_category'),

]
