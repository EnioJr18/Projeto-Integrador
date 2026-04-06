from django.urls import path
from .views import EventoSocialListCreateView, EventoSocialDetailView

urlpatterns = [
    path('', EventoSocialListCreateView.as_view(), name='evento-list-create'),
    path('<int:pk>/', EventoSocialDetailView.as_view(), name='evento-detail'),
]