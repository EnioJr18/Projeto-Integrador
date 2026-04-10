from django.conf import settings
from django.contrib.gis.db import models


class EventoSocial(models.Model):

    CATEGORIA_CHOICES = [
        ('saude', 'Saúde'),
        ('educacao', 'Educação'),
        ('cultura', 'Cultura'),
        ('esporte', 'Esporte'),
        ('assistencia_social', 'Assistência Social'),
        ('meio_ambiente', 'Meio Ambiente'),
        ('outro', 'Outro'),
    ]

    titulo = models.CharField(max_length=200)
    descricao = models.TextField()

    categoria = models.CharField(max_length=50, choices=CATEGORIA_CHOICES, default='outro')

    vagas = models.PositiveIntegerField()

    data_hora = models.DateTimeField()

    localizacao = models.PointField(srid=4326)

    criado_em = models.DateTimeField(auto_now_add=True)

    organizador = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='eventos_organizados')

    class Meta:
        verbose_name = 'Evento Social'
        verbose_name_plural = 'Eventos Sociais'
        ordering = ['data_hora']

    def __str__(self):
        return f'{self.titulo} ({self.get_categoria_display()})'