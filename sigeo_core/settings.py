import os
import environ
from pathlib import Path


env = environ.Env()
environ.Env.read_env()

BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = env('SECRET_KEY')
DEBUG = env('DEBUG', default=False)

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Bibliotecas Terceirizadas
    'rest_framework',
    # 'django.contrib.gis', # <-- Descomentar isso quando o PostGIS estiver rodando
    
    # Nossos Apps
    'apps.users',
    'apps.events',
    'apps.impact',
    'apps.ai_integration',
]