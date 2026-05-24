# 🌍 SIGEO-PS: Sistema de Informação Geográfica de Eventos

![Status](https://img.shields.io/badge/Status-Sprint_2_Concluída-yellow)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![Django](https://img.shields.io/badge/Django-5.0+-green)
![PostGIS](https://img.shields.io/badge/PostGIS-Geoespacial-1572B6)
![Postgres](https://img.shields.io/badge/PostgreSQL-Cloud-336791)
![Neon](https://img.shields.io/badge/Neon-Serverless-00e599)

> Uma plataforma robusta baseada em geolocalização para mapear, organizar e gerenciar a participação em ações comunitárias e mutirões sociais, com foco em segurança arquitetural e consultas espaciais avançadas.

---

## 📋 Sobre o Projeto

Este projeto abriga a solução de Backend (API REST) para o SIGEO-PS. O sistema integra ferramentas geoespaciais de ponta com políticas rigorosas de segurança de dados, conectando voluntários e organizadores de maneira eficiente para facilitar o engajamento social na região de Maceió-AL.

## ✨ Funcionalidades

### 🔐 Autenticação e Segurança
- **Múltiplos Papéis:** Autenticação via tokens JWT com diferenciação entre perfil `Comum` (voluntário) e `Organizador`.
- **Proteção IDOR e Tenant Isolation:** O sistema extrai as credenciais diretamente do token de quem faz a requisição, impedindo agendamentos forjados ou o vazamento de dados de inscrições entre usuários diferentes.

### 📍 Motor Geoespacial (Core)
- **Mapeamento Preciso:** Registro da localização exata dos eventos utilizando objetos `Point` (coordenadas geográficas SRID 4326 nativas do GeoDjango).
- **População Automatizada (Seed):** Script inteligente (`seed_events`) que injeta dados de mutirões realistas espalhados pelo mapa de Maceió para agilizar os testes e validações visuais da equipe de Frontend.

### 🎟️ Gestão de Inscrições
- **Participação Segura:** Botões de inscrição e cancelamento blindados por regras de negócio e validações em nível de serializer.
- **Dashboard do Organizador:** Painel de controle otimizado (usando SQL JOINs no ORM via `evento__organizador`) para o dono do projeto visualizar quem se inscreveu apenas nos eventos que ele mesmo criou.
- **Testes Automatizados:** Suíte de QA (`APITestCase`) validando 100% dos fluxos de autorização, integridade e isolamento de banco.

---

## 🛠 Tecnologias Utilizadas

### Backend (API)
- **Linguagem:** Python 3.11+
- **Framework:** Django & Django REST Framework (DRF)
- **Banco de Dados:** PostgreSQL (Via Neon Tech - Serverless)
- **Motor Espacial:** GeoDjango & PostGIS
- **Segurança:** PyJWT (Autenticação Stateless)

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Python 3.11+ instalado.
* Conta no [Neon.tech](https://neon.tech) (com a extensão PostGIS habilitada).

### 1️⃣ Configurando o Backend (Django)

1.  Clone o repositório e entre na pasta:
    ```bash
    git clone [https://github.com/seu-usuario/sigeo_backend.git](https://github.com/seu-usuario/sigeo_backend.git)
    cd sigeo_backend
    ```
2.  Crie e ative o ambiente virtual:
    ```bash
    # Windows
    python -m venv .venv
    .venv\Scripts\activate

    # Linux/Mac
    python3 -m venv .venv
    source .venv/bin/activate
    ```
3.  Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```
4.  Configure as variáveis de ambiente:
    * Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais:
    ```ini
    SECRET_KEY=sua_chave_secreta_django
    DEBUG=True
    DATABASE_URL=postgres://usuario:senha@host-neon.tech/neondb?sslmode=require
    ```
5.  Execute as migrações (Cria as tabelas no PostGIS):
    ```bash
    python manage.py migrate
    ```
6.  Popule o banco com os dados de teste (Mocks de Maceió):
    ```bash
    python manage.py seed_events
    ```
7.  Rode o servidor:
    ```bash
    python manage.py runserver
    ```
    *A API estará acessível em: `http://127.0.0.1:8000/`*

Para rodar os testes automatizados da API sem dropar o banco em nuvem, utilize o comando:  
```bash
python manage.py test apps.events --keepdb
```

📝 Licença
Este projeto está sob a licença MIT.

🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests focados na melhoria da arquitetura REST ou otimização de consultas geográficas.

👨‍💻 Autores
O ecossistema SIGEO-PS está sendo construído em conjunto pelas equipes de Backend e Frontend:

- Backend (GeoDjango, Inscrições e Infraestrutura): Enio Jr.
- Backend (Autenticação e Perfis JWT): Guilherme Pontes
- Frontend (Integração de APIs e UI/UX): Jean Marcos e Kelven Eduardo
- Engenheiro de Qualidade — Matheus Henrique
- Tester (QA funcional) — Entony Richard
- Gerente de Projeto — Victor Galvão