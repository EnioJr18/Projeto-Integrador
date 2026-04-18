from rest_framework import serializers
from .models import EventoSocial, Inscricao

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
        
        validators = []

    def create(self, validated_data):
        evento = validated_data['evento']
        participante = validated_data['participante']
        
        inscricoes_confirmadas = Inscricao.objects.filter(
            evento=evento, 
            status='confirmada'
        ).count()

        novo_status = 'pendente' if inscricoes_confirmadas >= evento.vagas else 'confirmada'

        inscricao_existente = Inscricao.objects.filter(evento=evento, participante=participante).first()

        if inscricao_existente:
            if inscricao_existente.status == 'cancelada':
                inscricao_existente.status = novo_status
                inscricao_existente.save()
                return inscricao_existente
            else:
                raise serializers.ValidationError({"detalhe": "Já estás inscrito neste evento."})

        validated_data['status'] = novo_status
        return super().create(validated_data)