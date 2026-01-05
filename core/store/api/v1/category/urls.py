from django.urls import path

from core.store.api.v1.category import CategoryListView, CategoryDeleteView

urlpatterns = [
    path('list/<int:startup_id>', CategoryListView.as_view(), name='list_categories'),
    path('delete/<int:category_id>', CategoryDeleteView.as_view(), name='delete_category'),

]
