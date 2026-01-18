from django.urls import path

from core.store.api.v1.startup import AllStartupsListAPIView, UserStartupsListAPIView, RegisterStartupAPIView, \
    StartupUpdateAPIView

urlpatterns = [
    path('all-startups/', AllStartupsListAPIView.as_view(), name='all-startups'),
    path('list/', UserStartupsListAPIView.as_view(), name='user-startups-list'),
    path('register/', RegisterStartupAPIView.as_view(), name='register-startup'),
    path('update/<int:startup_id>', StartupUpdateAPIView.as_view(), name='update-startup'),

]
