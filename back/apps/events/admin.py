from django.contrib import admin
from .models import EventoSocial, Inscricao
from django.contrib.auth import get_user_model

# Fazendo a mágica acontecer no painel
admin.site.register(EventoSocial)
admin.site.register(Inscricao)
User = get_user_model()
admin.site.register(User)