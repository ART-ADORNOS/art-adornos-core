from django.urls import path

from core.store.api.v1.category import CategoryListAPIView, CategoryDeleteAPIView

urlpatterns = [
    path('list/<int:startup_id>', CategoryListAPIView.as_view(), name='list_categories'),
    path('delete/<int:category_id>', CategoryDeleteAPIView.as_view(), name='delete_category'),

]
