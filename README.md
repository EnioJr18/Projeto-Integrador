# SIGEO-PS

SIGEO-PS (Geographic Information System for Social Projects) é a base de uma plataforma civic-tech para mapear projetos sociais, eventos comunitários e ações de impacto perto do usuário.

O repositório está organizado em duas partes:

- Backend em Django + Django REST Framework, responsável pela API.
- Front-end em React + Vite, responsável pela experiência web moderna da plataforma.

## Funcionalidades atuais

- Homepage moderna com busca de projetos sociais.
- Preview de mapa com marcadores interativos.
- Categorias de ações sociais: Health, Education, Food, Employment e Housing.
- Cards de eventos sociais em destaque.
- Integração preparada para consumir a API do Django.

## Requisitos

- Python 3.11 ou superior.
- Node.js 18 ou superior.
- npm.
- Banco PostgreSQL com suporte a PostGIS, porque o projeto usa GeoDjango.

No Windows, também pode ser necessário ter as dependências do GeoDjango/OSGeo4W disponíveis no sistema, conforme a configuração local.

## Estrutura do projeto

- `manage.py` - ponto de entrada do Django.
- `sigeo_core/` - configuração principal do projeto.
- `apps/` - apps do backend, como users, events, impact e ai_integration.
- `frontend/` - aplicação React/Vite com a homepage do SIGEO-PS.

## Configuração do backend

1. Crie e ative um ambiente virtual Python.

2. Instale as dependências:

```bash
pip install -r requirements.txt
```

3. Configure as variáveis de ambiente em um arquivo `.env` na raiz do projeto.

Exemplo mínimo:

```env
SECRET_KEY=coloque_uma_chave_segura_aqui
DEBUG=True
DATABASE_URL=postgis://usuario:senha@localhost:5432/sigeo
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

4. Execute as migrações:

```bash
python manage.py migrate
```

5. Crie um superusuário, se quiser acessar o admin:

```bash
python manage.py createsuperuser
```

6. Inicie o servidor do Django:

```bash
python manage.py runserver
```

O backend ficará disponível em `http://127.0.0.1:8000/`.

## Configuração do front-end

1. Entre na pasta do front-end:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

4. Para gerar a build de produção:

```bash
npm run build
```

5. Para pré-visualizar a build:

```bash
npm run preview
```

O front-end roda por padrão em `http://localhost:5173/`.

## Integração front-end e backend

O front-end já está preparado para conversar com a API do Django usando a base `http://localhost:8000/api`.

Se você mudar a URL da API, defina a variável `VITE_API_BASE_URL` no ambiente do front-end.

## Endpoints principais

- `GET /api/eventos/` - lista de eventos.
- `POST /api/eventos/` - criação de evento.
- `GET /api/users/me/` - dados do usuário autenticado.
- `POST /api/users/login/` - autenticação JWT.
- `POST /api/users/register/` - cadastro de usuário.

## Fluxo recomendado para desenvolvimento

1. Suba o backend com `python manage.py runserver`.
2. Suba o front-end com `npm run dev` dentro de `frontend/`.
3. Abra `http://localhost:5173/` para ver a homepage.
4. Evolua as telas consumindo a API e substituindo os dados estáticos por conteúdo real.

## Próximos passos sugeridos

- Conectar a homepage aos dados reais da API.
- Criar login e cadastro no front-end.
- Implementar filtros por categoria e localização.
- Transformar o preview do mapa em um componente dinâmico.
