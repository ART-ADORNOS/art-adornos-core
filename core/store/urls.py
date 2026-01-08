from django.urls import path, include

from core.store.views import *

app_name = 'store'
urlpatterns = []

urlpatterns += [
    # Category
    path('category/register/', RegisterCategoryView.as_view(), name='register_category'),
    path('api/category/update/<int:category_id>', CategoryUpdateView.as_view(), name='update_category'),

    # Cart
    path('api/cart/register/', RegisterCartView.as_view(), name='register_cart'),
    path('api/cart/update/<int:cart_id>', UpdateCartView.as_view(), name='update_cart'),

    # Api
    path('api/', include('core.store.api.v1.urls'))
]
