# 🏥 E-commerce de Farmácia – Backend (NestJS)

Projeto desenvolvido por Pâmela dos Reis, para a entrega do **Performance Goal do Bootcamp Generation Brasil – Bloco 02**, com o objetivo de aplicar os conceitos estudados em **NestJS**, criando uma **API REST** para um sistema de **comércio eletrônico de uma farmácia**.

O foco do projeto está na criação e gerenciamento do **Recurso Categoria**, incluindo CRUD completo, regras de negócio e endpoints extras que valorizam a solução.

---

## 🚀 Tecnologias Utilizadas

* **Node.js**
* **NestJS**
* **TypeScript**
* **TypeORM**
* **MySQL**
* **Insomnia** (testes de requisição)

---

## 📌 Descrição do Recurso

### Categoria

Representa a categoria dos produtos de uma farmácia, permitindo:

* Cadastro
* Consulta
* Atualização
* Remoção (com regra de negócio)
* Controle de disponibilidade em estoque

A entidade **Categoria** possui os seguintes atributos:

| Atributo  | Tipo    | Descrição                        |
| --------- | ------- | -------------------------------- |
| id        | number  | Identificador único              |
| nome      | string  | Nome da categoria                |
| descricao | string  | Descrição da categoria           |
| emEstoque | boolean | Indica se há produtos em estoque |

---

## 📂 Estrutura do Projeto

```
src/
├── categoria/
│   ├── controllers/
│   │   └── categoria.controller.ts
│   ├── entities/
│   │   └── categoria.entity.ts
│   ├── services/
│   │   └── categoria.service.ts
│   └── categoria.module.ts
├── app.module.ts
└── main.ts
```

---

## 🔄 Endpoints da API

### 🔹 Criar Categoria

**POST** `/categorias`

```json
{
  "nome": "Medicamentos",
  "descricao": "Produtos farmacêuticos",
  "emEstoque": true
}
```

---

### 🔹 Listar Todas as Categorias

**GET** `/categorias`

---

### 🔹 Buscar Categoria por ID

**GET** `/categorias/{id}`

---

### 🔹 Buscar Categorias por Nome

**GET** `/categorias/nome/{nome}`

Exemplo:

```
/categorias/nome/Med
```

---

### 🔹 Atualizar Categoria

**PUT** `/categorias`

```json
{
  "id": 1,
  "nome": "Medicamentos",
  "descricao": "Uso comum",
  "emEstoque": false
}
```

---

### 🔹 Deletar Categoria

**DELETE** `/categorias/{id}`

📌 **Regra de Negócio:**

* A categoria **não pode ser removida** se estiver com `emEstoque = true`.

---

## ⭐ Endpoints Extras (Diferenciais)

### 🔸 Buscar Categorias por Status de Estoque

**GET** `/categorias/estoque/{status}`

Exemplos:

```
/categorias/estoque/true
/categorias/estoque/false
```

📌 Caso não exista nenhuma categoria com o status informado, a API retorna:

```json
{
  "statusCode": 404,
  "message": "Não existem categorias em estoque no momento!"
}
```

---

### 🔸 Alternar Status de Estoque (Toggle)

**PUT** `/categorias/toggle-estoque/{id}`

📌 Este endpoint inverte automaticamente o valor do campo `emEstoque`:

* `true` → `false`
* `false` → `true`

---

## ⚙️ Regras de Negócio Implementadas

* ❌ Não é permitido deletar categorias que possuam produtos em estoque
* 🔄 O status de estoque pode ser alternado via endpoint específico
* 🚫 Retorno de erro quando buscas não encontram resultados
* 📢 Mensagens claras utilizando `HttpException`

---

## 🧪 Testes

Os testes das rotas foram realizados utilizando o **Insomnia**, validando:

* Respostas HTTP corretas
* Funcionamento do CRUD
* Aplicação das regras de negócio

---

## ▶️ Como Executar o Projeto

```bash
# Instalar dependências
npm install

# Executar o projeto
npm run start:dev
```

Configure corretamente o banco de dados MySQL no arquivo `app.module.ts`.

---

## 🎯 Considerações Finais

Este projeto demonstra a aplicação prática dos conceitos fundamentais de **NestJS**, organização em camadas, uso de **TypeORM**, criação de **API REST**, implementação de **regras de negócio** e boas práticas de backend.

O desenvolvimento do CRUD de Categoria, aliado aos endpoints extras, agrega valor à solução e reflete a evolução técnica adquirida ao longo do **Bootcamp Generation Brasil**.

---

💙 Desenvolvido com dedicação durante o Bootcamp Generation Brasil


