# Mediotec - Sistema de Gerenciamento Escolar

## Versão: 1.0.0  
**Autor**: Amalia Nascimento ,Amanda,  Abraão , Luiz , Luana, Guilherme 

## Descrição

**Mediotec** é um sistema de gerenciamento escolar, que facilita a administração de usuários e dados escolares. O sistema utiliza Node.js, Express e Prisma para gerenciar dados em um banco de dados MySQL.

## Requisitos

Certifique-se de ter os seguintes itens instalados:

- Node.js v12+
- MySQL
- Prisma
## Dependências
- @prisma/client: Cliente Prisma para interagir com o banco de dados.
- body-parser: Middleware para parsing de corpos JSON e URL-encoded.
- cors: Middleware para permitir requisições entre origens diferentes.
- dotenv: Carrega variáveis de ambiente de um arquivo .env.
- http: Módulo HTTP básico do Node.js.
- parser: Biblioteca auxiliar para parsing de dados.
- router: Gerenciamento de rotas.
- uuid: Geração de identificadores únicos universais (UUID).


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
