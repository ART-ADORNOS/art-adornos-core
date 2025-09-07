from django.urls import path, include

from Apps.store.views import *

app_name = 'store'
urlpatterns = []

urlpatterns += [
    # Api
    path('api/user-industry/', UserIndustryView.as_view(), name='user-industry'),
    path('api/startups/all-startups/', AllStartupsListView.as_view(), name='all-startups'),

    # Startup
    path('startups/register/', RegisterStartupView.as_view(), name='register_startup'),
    path('api/startups/list/', UserStartupsListView.as_view(), name='get_startup'),
    path('api/startups/update/<int:startup_id>/', StartupUpdateView.as_view(), name='update_startup'),
    path('api/startups/delete/<int:startup_id>/', StartupDeleteView.as_view(), name='delete_startup'),

    # Category
    path('category/register/', RegisterCategoryView.as_view(), name='register_category'),
    path('api/category/update/<int:category_id>', CategoryUpdateView.as_view(), name='update_category'),

    # Cart
    path('api/cart/register/', RegisterCartView.as_view(), name='register_cart'),
    path('api/cart/update/<int:cart_id>', UpdateCartView.as_view(), name='update_cart'),

    # Api
    path('api/', include('Apps.store.api.urls'))
]
