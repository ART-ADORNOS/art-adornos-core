from django.urls import path

from Apps.store.views import *

app_name = 'store'
urlpatterns = []

urlpatterns += [
    # Api
    path('api/industry-choices/', IndustryListView.as_view(), name='industry-choices'),
    path('api/user-industry/', UserIndustryView.as_view(), name='user-industry'),
    path('api/startups/all-startups/', AllStartupsListView.as_view(), name='all-startups'),

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

    # Cart
    path('api/cart/', CartListView.as_view(), name='get_cart'),
    path('api/cart/register/', RegisterCartView.as_view(), name='register_cart'),
    path('api/cart/update/<int:cart_id>', UpdateCartView.as_view(), name='update_cart'),
    path('api/cart/delete/<int:cart_id>', DeleteCartView.as_view(), name='delete_cart'),
    path('api/cart/delete-product/<int:cart_product_id>', DeleteCartProductView.as_view(), name='delete_cart_product'),

    # Order
    path('api/order/register/', RegisterOrderView.as_view(), name='register_order'),
]
