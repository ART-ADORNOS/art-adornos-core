from django.urls import path

from core.store.api.v1.category import CategoryListAPIView, CategoryDeleteAPIView, RegisterCategoryAPIView, \
    CategoryUpdateAPIView

urlpatterns = [
    path('list/<int:startup_id>', CategoryListAPIView.as_view(), name='list_categories'),
    path('register/', RegisterCategoryAPIView.as_view(), name='register_category'),
    path('update/<int:category_id>', CategoryUpdateAPIView.as_view(), name='update_category'),
    path('delete/<int:category_id>', CategoryDeleteAPIView.as_view(), name='delete_category'),

]
