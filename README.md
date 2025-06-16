# 🎧 MusicStream: Uma Réplica Baseada no Spotify

Este projeto é uma aplicação web full-stack desenvolvida como uma réplica simplificada do Spotify, focada no gerenciamento de usuários, músicas e playlists. Ele é construído com um backend em Node.js (Express), um frontend em Vue.js e utiliza MongoDB como banco de dados, tudo orquestrado via Docker Compose para um ambiente de desenvolvimento consistente.

## Visão Geral

A aplicação permite que usuários façam login, gerenciem seus perfis, carreguem e organizem suas músicas, e criem playlists. A interface do usuário é inspirada no design do Spotify, oferecendo uma experiência intuitiva para navegação e interação com o conteúdo musical.

## Funcionalidades Principais


### **Gerenciamento de Usuários:**
*   **Criação, Leitura, Atualização e Exclusão (CRUD):** Total controle sobre os perfis de usuário.
*   **Autenticação:** Sistema de login seguro com hashing de senhas (`bcrypt`) e JSON Web Tokens (JWT) para sessões autenticadas.
*   **Preenchimento Automático de Endereço:** Integração com a API ViaCEP para preenchimento automático de logradouro, bairro e estado com base no CEP.

### **Gerenciamento de Músicas:**
*   **CRUD:** Capacidade de adicionar, visualizar, editar e remover músicas.
*   **Upload de Mídia:** Suporte para upload de arquivos de áudio e miniaturas (thumbnails) associadas às músicas.
*   **Organização por Autor:** Músicas são associadas a um `autorId`, permitindo a listagem de músicas por usuário.

### **Gerenciamento de Playlists:**
*   **CRUD:** Criação, visualização, edição e exclusão de playlists.
*   **Adição de Músicas:** Playlists podem incluir múltiplas músicas (por seus IDs).
*   **Permissões:** Playlists podem ser definidas como "Públicas" ou "Privadas".
*   **Upload de Thumbnail:** Suporte para upload de imagens de capa para as playlists.

  ---

## Tecnologias Utilizadas

### **Backend (Node.js/Express):**

*   **Docker:** Para empacotar e isolar os ambientes do backend, frontend e banco de dados.
*   **Docker Compose:** Para definir e executar aplicações Docker multi-contêineres com uma única linha de comando.
*   **Node.js:** Ambiente de execução JavaScript.
*   **Express.js:** Framework web para construir a API RESTful.
*   **MongoDB & Mongoose:** Banco de dados NoSQL e ODM (Object Data Modeling) para interação com o MongoDB.
*   **Bcrypt:** Biblioteca para hashing de senhas.
*   **JSON Web Tokens (JWT):** Para autenticação e autorização de usuários.
*   **Multer:** Middleware para tratamento de upload de arquivos (áudio e imagens).
*   **Helmet:** Ajuda a proteger a aplicação Express contra vulnerabilidades de segurança.
*   **Express-Rate-Limit:** Middleware para limitar requisições repetidas para a mesma API, para evitar ataques de força bruta.
*   **CORS:** Middleware para habilitar o Compartilhamento de Recursos de Origem Cruzada.
*   **Compression:** Para compressão de dados da resposta HTTP.
*   **Morgan:** Logger de requisições HTTP.
*   **Dotenv:** Para carregar variáveis de ambiente.

### **Frontend (Vue.js):**
*   **Vue.js 3:** Framework JavaScript progressivo para a construção da interface do usuário.
*   **Vue Router:** Gerenciamento de rotas e navegação da SPA (Single Page Application).
*   **Tailwind CSS:** Framework CSS utility-first para estilos rápidos e responsivos.
*   **Axios:** Cliente HTTP para fazer requisições à API do backend.

## Entidades do Projeto

O projeto é construído em torno das seguintes entidades principais:

*   **USUÁRIO:**
    *   Representa o usuário da plataforma. Pode ser um usuário normal ou um **Autor** (aquele que envia músicas).
    *   Armazena informações como `nome`, `email`, `senha` (hashed), e dados de `endereço` (logradouro, bairro, estado, CEP).
*   **MÚSICA (ÁUDIO):**
    *   Representa uma faixa de áudio disponível na plataforma.
    *   Possui `nome`, `artist`, `genero`, `filePath` (caminho para o arquivo de áudio), `thumbnailPath` (caminho para a miniatura), e `autorId` (ligada ao USUÁRIO).
*   **PLAYLIST:**
    *   Coleção de músicas.
    *   Possui `nome`, `descricao`, `donoId` (ligada ao USUÁRIO que criou a playlist), um array de `musicasIds` (ligada a MÚSICAS), `permission` (pública/privada), e `thumbnailPath`.

---

## 🗺️ Endpoints da API

Uma coleção do Postman foi fornecida para facilitar o teste dos endpoints do backend. Importe o arquivo `Rotas-Postman/Spotify - Collection.postman_collection.json` para o seu Postman.

Os endpoints incluem operações CRUD para:

*   **Usuários:**
    *   `POST /create-user`
    *   `GET /get-users`
    *   `GET /get-user/:id`
    *   `PUT /edit-user/:id`
    *   `DELETE /delete-user/:id`
*   **Músicas:**
    *   `POST /create-music` (suporta `form-data` para arquivos)
    *   `GET /get-musics`
    *   `GET /get-music/:id`
    *   `GET /get-musics-by-user/:autorId`
    *   `PUT /edit-music/:id` (suporta `form-data` para arquivos)
    *   `DELETE /delete-music/:id`
*   **Playlists:**
    *   `POST /create-playlist` (suporta `form-data` para thumbnail e `musicasIdsArray` como JSON string)
    *   `GET /get-playlists`
    *   `GET /get-playlist/:id`
    *   `GET /get-playlists-by-user/:donoId`
    *   `PUT /edit-playlist/:id` (suporta `form-data` para thumbnail)
    *   `DELETE /delete-playlist/:id`
*   **Autenticação:**
    *   `POST /login` (para autenticar usuários)
    *   `POST /logout` (para encerrar sessões)
