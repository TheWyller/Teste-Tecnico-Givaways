# Teste Técnico Givaways

Projeto Backend realizado em Node.js com o framework express, banco de dados relacional Postgres. Esse teste técnico tem o intuito de receber requisições de um CRUD de produtos e gravar no banco de dados, além de uma rota adicional para consumir uma API e gravar os dados recebidos no banco de dados.

Vale ressaltar, que foi criada uma versão com rotas adicionais de cadastro o login de usuários.

## Como Rodar a Aplicação

**Atenção o NODE deve estar instalado na máquina**

_O gerenciador de arquivos usado foi o yarn mais pode ser usado o npm_

### Início

Realizar o clone do repositório. Na pasta raiz executar os seguintes comandos:

Para inicializar o Backend:

```shell
  cd Backend_Sem_Login

  ou

  cd Backend_Login
```

```shell
  yarn
```

criar um arquivo .env com os paramêtros de banco de dados e de usuário do postgres.

```shell
  .env sem login:

  POSTGRES_USER=
  POSTGRES_PASSWORD=
  POSTGRES_DB=

  .env com login:

  POSTGRES_USER=
  POSTGRES_PASSWORD=
  POSTGRES_DB=
  JWT_SECRET=
  ADM_PASSWORD=
```

Rodar as migrations do TypeORM

```shell
  yarn typeorm migration:run -d src/data-source.ts
```

Abrir o servidor

```shell
  yarn dev
```

Caso deseje testar apenas o backend com login, o usuário ADM padrão é:

```shell
  email = root@root.com
  senha = ADM_PASSWORD ou 123456 quando não aplicado no arquivo .env
```

## TESTES

### Testes Backend

Os testes realizados foram para os Usuários apenas.

Para rodar os testes deve-se estar na raiz do projeto e aplicar os seguintes comandos:

```shell
  cd Backend
```

```shell
  yarn test
```

## Endpoints - API

Caso seja rodado o Backend sem o cadastro e login as rotas de /user podem ser desconsideradas

## 1. **Users**

O objeto User é definido como:

| Campo     | Tipo    | Descrição                                    |
| --------- | ------- | -------------------------------------------- |
| id        | string  | Identificador único do usuário               |
| firstName | string  | O nome do usuário.                           |
| lastName  | string  | O sobrenome do usuário.                      |
| phone     | boolean | O telefone do usuário.                       |
| email     | objeto  | O e-mail do usuário.                         |
| password  | string  | A senha de acesso do usuário                 |
| createdAt | Date    | Indica data de criação do usuário            |
| updatedAt | Date    | Indica data de última atualização do usuário |
| products  | Array   | Todos os produtos vinculados a esse usuário  |

### Endpoints

| Método | Rota       | Descrição                                 |
| ------ | ---------- | ----------------------------------------- |
| POST   | /users     | Criação de um usuário.                    |
| GET    | /users     | Lista todos os usuários - apenas o ADM    |
| GET    | /users/:id | Lista o próprio usuário                   |
| DELETE | /users/:id | Deleta o usuário                          |
| PATCH  | /users/:id | Atualiza campos do usuário passado por ID |

---

### 1.1. **Criação de Usuário**

### `/users`

### Exemplo de Request:

```
POST /users
Authorization: Token
```

### Corpo da Requisição:

```json
{
  "firstName": "Wyller",
  "lastName": "Fernandes",
  "phone": "41999999999",
  "email": "wyller@wyller.com",
  "password": "123456"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "47468317-f47e-40ed-b231-af6fe70339f8",
  "firstName": "Wyller",
  "lastName": "Fernandes",
  "email": "wyller@kenzie.com",
  "phone": "41999999999",
  "created_at": "2022-11-29T11:39:42.518Z",
  "updated_at": "2022-11-29T11:39:42.518Z",
  "isAdm": false
  "contacts": []
}
```

### Possíveis Erros:

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 400 Conflict   | Email already registered. |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:

```
GET /users
Authorization: Token e ser Administrador
```

### Corpo da Requisição:

```
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "d7b292cc-a4b2-4459-be2f-0e1a8c04ca5e",
    "firstName": "root",
    "lastName": "adm",
    "email": "root@root.com",
    "phone": "41999999999",
    "created_at": "2022-11-29T11:39:42.518Z",
    "updated_at": "2022-11-29T11:39:42.518Z",
    "isAdm": true
    "contacts": []
  },
  {
    "id": "47468317-f47e-40ed-b231-af6fe70339f8",
    "firstName": "Wyller",
    "lastName": "Fernandes",
    "email": "wyller@kenzie.com",
    "phone": "41999999999",
    "created_at": "2022-11-29T11:39:42.518Z",
    "updated_at": "2022-11-29T11:39:42.518Z",
    "isAdm": false
    "contacts": []
  }
]
```

### Possíveis Erros:

```JSON
{
	"message": "Invalid token"
}
```

ou

```JSON
{
	"message": "You're not the ADM"
}
```

---

### 1.3. **Atualizar um Usuário por ID**

### `/users/:id`

### Exemplo de Request:

```
PATCH /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Authorization: Token e usuário dono
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
{
  "firstName": "Wyller2",
  "lastName": "Fernandes2",
  "email": "wyller2@kenzie.com",
  "phone": "419999999992"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "User updated",
  "userdata": {
    "id": "0721c526-34d3-41ff-82b0-0a19394a146a",
    "firstName": "Wyller",
    "lastName": "Fernandes",
    "email": "wyller2@kenzie.com",
    "phone": "41955555555",
    "created_at": "2022-11-28T14:00:49.671Z",
    "updated_at": "2022-11-29T11:51:39.021Z",
    "isAdm": false,
    "contacts": []
  }
}
```

### Possíveis Erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 400 Not Found  | User not found. |

---

### 1.4. **Deletar um Usuário por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:

```
DELETE /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Authorization: Token e ser o dono do usuário
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```
vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "Usuário deletado com sucesso!"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição           |
| --------------- | ------------------- |
| 409 Conflict    | User not found.     |
| 400 Bad Request | Usuário já deletado |

---

## 2. **Login**

### 2.1. **Login do Usuário**

### `/login`

### Exemplo de Request:

```
POST /login
Authorization: None
```

### Corpo da Requisição:

```json
{
  "email": "root@root.com",
  "password": "123456"
}
```

### Exemplo de Response:

```
200 Ok
```

```json
{
  "token": "ebJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6MSwiaWQiOiJiOTU1MmUzYS0wMWUzLTQ0MTMtOGE3Ni1kOWNjZGI2NzczOTMiLCFpYXQiOjE2NjMwOTc4MzQsImV4cCI6MTY2MzE4NDIzNH0.gw9R_KST5TdN__DMx6Aj83KKbwmX-4UbNArYu0DGJo2"
}
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 403 Forbidden  | Invalid Credentials |

---
## 3. **Produtos**

### 1.1. **Criação de um Produto**

### `/products`

### Exemplo de Request:

```
POST /products
*Authorization: Token

*no caso da aplicação com as rotas de cadastro e login
```

### Corpo da Requisição:

```json
{
  "name": "Fejão",
  "category": "Comida",
  "quantity": "300 pacotes"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "cb674df9-05c2-48d6-905b-e8a271b1aae9",
  "name": "Fejão",
  "category": "Comida",
  "quantity": "300 pacotes",
  "created_at": "2023-01-16T17:43:35.553Z",
  "updated_at": "2023-01-16T17:43:35.553Z",
  "deleted_at": null,
  "status": true
}
```

### 1.2. **Listando Produtos do Usuário**

### `/products`

### Exemplo de Request:

```
GET /products
*Authorization: Token

*no caso da aplicação com as rotas de cadastro e login
```

### Corpo da Requisição:

```
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "cb674df9-05c2-48d6-905b-e8a271b1aae9",
    "name": "Arroz",
    "category": "Comida",
    "status": true,
    "quantity": "300 pacotes",
    "created_at": "2023-01-16T17:43:35.553Z",
    "updated_at": "2023-01-16T17:43:35.553Z",
    "deleted_at": null
  },
  {
    "id": "62f17639-f72a-45ee-9285-0d0b79695506",
    "name": "Fejão",
    "category": "Comida",
    "status": true,
    "quantity": "300 pacotes",
    "created_at": "2023-01-16T17:41:43.052Z",
    "updated_at": "2023-01-16T17:43:44.614Z",
    "deleted_at": null
  },
  {
    "id": "4c338471-7434-4533-824b-e1b694139184",
    "name": "Fejão Cavalo",
    "category": "Comida",
    "status": false,
    "quantity": "300 pacotes",
    "created_at": "2023-01-16T17:41:48.890Z",
    "updated_at": "2023-01-16T17:41:48.890Z",
    "deleted_at": "2023-01-16"
  }
]
```

### Possíveis Erros:

```JSON
{
	"message": "Invalid token"
}
```

---

### 1.3. **Atualizar um Produto por ID**

### `/products/:id`

### Exemplo de Request:

```
PATCH /products/9cda28c9-e540-4b2c-bf0c-c90006d37893
*Authorization: Token e usuário dono do produto

*no caso da aplicação com as rotas de cadastro e login
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                 |
| --------- | ------ | ----------------------------------------- |
| id        | string | Identificador único do contato (Products) |

### Corpo da Requisição:

```json
{
  "name": "Sal"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "Product updated",
  "userdata": {
    "id": "62f17639-f72a-45ee-9285-0d0b79695506",
    "name": "Sal",
    "category": "Comida",
    "status": true,
    "quantity": "300",
    "created_at": "2023-01-16T17:41:43.052Z",
    "updated_at": "2023-01-16T17:43:44.614Z",
    "deleted_at": null
  }
}
```

### Possíveis Erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 400 Not Found  | User not found. |

---

### 1.4. **Deletar um Produto por ID**

### `/products/:id`

### Exemplo de Request:

```
DELETE /products/9cda28c9-e540-4b2c-bf0c-c90006d37893
*Authorization: Token e usuário dono do produto

*no caso da aplicação com as rotas de cadastro e login
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do produto (Product) |

### Corpo da Requisição:

```
vazio
```

### Exemplo de Response:

```
200 OK
```

```
{
	"message": "Product removed"
}
```

### Possíveis Erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 400 Conflict   | Product not found. |
