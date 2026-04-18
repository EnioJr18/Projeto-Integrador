from rest_framework import serializers
from .models import EventoSocial
from .models import Inscricao


class EventoSocialSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventoSocial
        fields = '__all__'


class InscricaoSerializer(serializers.ModelSerializer):
    participante = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Inscricao
        fields = ['id', 'evento', 'participante', 'status', 'data_inscricao']
        read_only_fields = ['status', 'data_inscricao']