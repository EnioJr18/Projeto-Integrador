from rest_framework import serializers
from .models import EventoSocial


class EventoSocialSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventoSocial
        fields = '__all__'