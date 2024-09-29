# Mediotec - Sistema de Gerenciamento Escolar

## Versão: 1.0.0  
**Autor**: Amalia Nascimento ,Amanda,  Abraão , Luiz , Luana Comin, Rafael Moura 

## Descrição

**Mediotec** é um sistema de gerenciamento escolar, que facilita a administração de usuários e dados escolares. O sistema utiliza Node.js, Express e Prisma para gerenciar dados em um banco de dados Postgres.

## Requisitos

Certifique-se de ter os seguintes itens instalados:

- Node.js v12+
- Postgres
- Prisma
## Dependências

Este projeto utiliza várias dependências para oferecer suas funcionalidades. Abaixo estão listadas as principais dependências do projeto, junto com uma breve descrição de cada uma:

- **@prisma/client**: ^5.19.1  
  Client do Prisma para interagir com o banco de dados de forma fácil e segura. Permite realizar operações de CRUD de maneira simplificada.

- **bcrypt**: ^5.1.1  
  Biblioteca para hashing de senhas. Utilizada para criptografar as senhas dos usuários, garantindo que elas sejam armazenadas de forma segura.

- **body**: ^5.1.0  
  Middleware para lidar com o corpo das requisições, útil para extrair dados enviados em requisições HTTP.

- **body-parser**: ^1.20.3  
  Middleware para interpretar o corpo das requisições em diferentes formatos, como JSON e URL-encoded.

- **cors**: ^2.8.5  
  Middleware que permite o controle de compartilhamento de recursos entre diferentes origens. É utilizado para permitir que recursos do servidor sejam acessíveis por páginas web de diferentes domínios.

- **dotenv**: ^16.4.5  
  Biblioteca para carregar variáveis de ambiente a partir de um arquivo `.env`. Facilita a configuração de variáveis sensíveis, como senhas e chaves de API.

- **express**: ^4.21.0  
  Framework web minimalista para Node.js. Utilizado para construir APIs e aplicações web de forma rápida e organizada.

- **helmet**: ^8.0.0  
  Middleware que ajuda a proteger a aplicação configurando vários cabeçalhos HTTP. Melhora a segurança geral da aplicação.

- **http**: ^0.0.1-security  
  Módulo para criar servidores HTTP. É uma parte essencial do Node.js, embora geralmente seja utilizado por padrão ao usar o Express.

- **jsonwebtoken**: ^9.0.2  
  Biblioteca para criar e verificar tokens JWT (JSON Web Tokens). Utilizada para autenticação e controle de acesso em APIs.

- **parser**: ^0.1.4  
  Biblioteca para parsing de dados em diferentes formatos. Pode ser usada para interpretar dados de requisições de forma personalizada.

- **router**: ^1.3.8  
  Biblioteca que fornece um sistema de roteamento. Utilizada para organizar rotas de forma modular em aplicações Express.

- **Router**: ^2.1.0  
  Similar à biblioteca anterior, mas pode ter funcionalidades e métodos ligeiramente diferentes. Usado para a modularização das rotas.

- **uuid**: ^10.0.0  
  Biblioteca para gerar identificadores únicos universais (UUIDs). Utilizada para criar IDs únicos para usuários ou outros recursos.



# Documentação das Rotas

## Usuários

| Método | Rota                                 | Descrição                            |
|--------|--------------------------------------|-------------------------------------|
| POST   | `/mediotec/usuarios/`                | Cria um novo usuário                |
| GET    | `/mediotec/usuarios/`                | Obtém todos os usuários             |
| GET    | `/mediotec/usuarios/:id`             | Obtém um usuário por ID             |
| GET    | `/mediotec/usuarios/name/:name`      | Obtém um usuário pelo nome          |
| GET    | `/mediotec/usuarios/role/:role`      | Obtém usuários por tipo de papel    |
| PUT    | `/mediotec/usuarios/:id`             | Atualiza um usuário por ID          |
| DELETE | `/mediotec/usuarios/delete/:id`      | Deleta um usuário por ID            |

---

## Disciplinas

| Método | Rota                                   | Descrição                            |
|--------|----------------------------------------|-------------------------------------|
| POST   | `/mediotec/disciplinas/`               | Cria uma nova disciplina             |
| GET    | `/mediotec/disciplinas/`               | Obtém todas as disciplinas           |
| GET    | `/mediotec/disciplinas/course/:id`     | Obtém uma disciplina por ID          |
| GET    | `/mediotec/disciplinas/:courseName`    | Obtém uma disciplina pelo nome       |
| GET    | `/mediotec/disciplinas/:courseClass`   | Obtém disciplinas por turma          |
| GET    | `/mediotec/disciplinas/:userId`        | Obtém disciplinas por usuário        |
| PUT    | `/mediotec/disciplinas/courseupdate/:id`| Atualiza uma disciplina por ID       |
| DELETE | `/mediotec/disciplinas/coursedelete/:id`| Deleta uma disciplina por ID         |

---

## Turmas

| Método | Rota                                | Descrição                            |
|--------|-------------------------------------|-------------------------------------|
| POST   | `/mediotec/turmas/`                 | Cria uma nova turma                 |
| GET    | `/mediotec/turmas/`                 | Obtém todas as turmas               |
| GET    | `/mediotec/turmas/id/:id`           | Obtém uma turma por ID              |
| GET    | `/mediotec/turmas/year/:year`       | Obtém turmas por ano               |
| PUT    | `/mediotec/turmas/update/:id`       | Atualiza uma turma por ID           |
| DELETE | `/mediotec/turmas/delete/:id`       | Deleta uma turma por ID             |

---

## Conceitos

| Método | Rota                             | Descrição                                        |
|--------|----------------------------------|--------------------------------------------------|
| `POST` | `/`                              | Cria um novo conceito.                           |
| `GET`  | `/conceitos`                     | Obtém todos os conceitos.                        |
| `GET`  | `/conceito/:conceitoId`          | Obtém um conceito pelo ID.                       |
| `GET`  | `/conceitos/:turma`              | Obtém conceitos por turma (classId).             |
| `GET`  | `/conceitos/user/:userId`        | Obtém conceitos de um usuário específico.        |
| `PUT`  | `/conceito/update/:conceitoId`   | Atualiza um conceito pelo ID.                    |
| `DELETE`| `/conceito/delete/:conceitoId`  | Deleta um conceito pelo ID.                      |


# Notificações

| Método  | Rota                         | Descrição                                      |
|---------|------------------------------|------------------------------------------------|
| `POST`  | `/`                          | Cria uma nova notificação.                     |
| `GET`   | `/`                          | Obtém todas as notificações.                   |
| `GET`   | `/notification/:title`      | Obtém uma notificação pelo título.             |
| `GET`   | `/notification/:id`         | Obtém uma notificação pelo ID.                 |
| `PUT`   | `/notification/:id`         | Atualiza uma notificação pelo ID.              |
| `DELETE`| `/notification/:id`         | Deleta uma notificação pelo ID.                |
