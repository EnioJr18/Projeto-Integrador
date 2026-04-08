from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import EventoSocial
from .serializers import EventoSocialSerializer
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D


class EventoSocialListCreateView(generics.ListCreateAPIView):
    queryset = EventoSocial.objects.all()
    serializer_class = EventoSocialSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['categoria']
    search_fields = ['titulo', 'descricao']
    ordering_fields = ['data_hora', 'criado_em']

    def get_queryset(self):
        queryset = super().get_queryset()

        lat = self.request.query_params.get('lat')
        lon = self.request.query_params.get('lon')
        raio = self.request.query_params.get('raio')

        if lat and lon and raio:
            ponto_usuario = Point(float(lon), float(lat), srid=4326)
            queryset = queryset.filter(
                localizacao__distance_lte=(ponto_usuario, D(km=float(raio)))
            )

        return queryset
        


class EventoSocialDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EventoSocial.objects.all()
    serializer_class = EventoSocialSerializer