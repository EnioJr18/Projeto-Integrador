from rest_framework import generics
from .models import EventoSocial
from .serializers import EventoSocialSerializer


class EventoSocialListCreateView(generics.ListCreateAPIView):
    queryset = EventoSocial.objects.all()
    serializer_class = EventoSocialSerializer


class EventoSocialDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EventoSocial.objects.all()
    serializer_class = EventoSocialSerializer