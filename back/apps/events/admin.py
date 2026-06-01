from django.contrib import admin
from .models import EventoSocial, Inscricao

# Fazendo a mágica acontecer no painel
admin.site.register(EventoSocial)
admin.site.register(Inscricao)