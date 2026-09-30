# API REST com Express
**API REST para gestão de alunos e cursos**

API RESTful desenvolvida para gerenciar alunos e cursos em um banco de dados MySQL, permitindo cadastrar, consultar, atualizar e excluir registros por meio de endpoints HTTP.


# 1. Descrição

Esta API foi desenvolvida para controlar informações de alunos em um ambiente de estudo, com foco em operações básicas de CRUD. Ela demonstra o funcionamento de uma API REST utilizando Node.js, Express e MySQL, com respostas em JSON, conexão por pool e rotas organizadas por responsabilidade.


# 2. Funcionalidades

- Cadastro de alunos;
- Listagem de todos os alunos;
- Consulta de aluno por ID;
- Atualização de dados do aluno;
- Exclusão de aluno por ID;
- Cadastro de cursos;
- Listagem de todos os cursos;
- Consulta de curso por ID;
- Atualização de dados do curso;
- Exclusão de curso por ID;
- Validação da existência do curso antes do cadastro de um aluno;


# 3. Tecnologias Utilizadas

- Node.js
- Express
- JavaScript
- Nodemon
- Docker Compose
- MySQL
- mysql2


# 4. Arquitetura e Organização do Projeto

```bash
api-rest/
│
├── src/
│   ├── database/
│   │   └── pool.js
│   ├── controllers/
│   │   └── AlunoController.js
│   │   └── CursoController.js
│   ├── repositories/
│   │   └── AlunoRepository.js
│   │   └── CursoRepository.js
│   ├── routes/
│   │   └── alunos.routes.js
│   │   └── cursos.routes.js
│   ├── services/
│   │   └── AlunoService.js
│   ├── app.js
│   └── server.js
│
├── bruno/
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md

```

Descrição resumida:

- `src/server.js` — testa a conexão com o MySQL e inicializa o servidor;
- `src/app.js` — configura o Express e registra as rotas da aplicação;
- `src/controllers/AlunoController.js` — recebe as requisições de alunos e define as respostas HTTP;
- `src/controllers/CursoController.js` — recebe as requisições de cursos e define as respostas HTTP;
- `src/repositories/AlunoRepository.js` — executa as operações de persistência dos alunos no MySQL;
- `src/repositories/CursoRepository.js` — executa as operações de persistência dos cursos no MySQL;
- `src/routes/alunos.routes.js` — define as rotas CRUD de alunos;
- `src/routes/cursos.routes.js` — define as rotas CRUD de cursos;
- `src/services/AlunoService.js` — valida o curso antes de cadastrar um aluno;
- `src/database/pool.js` — configura o pool de conexões com o banco de dados;
- `bruno/` — contém requisições para testar os endpoints;
- `docker-compose.yml` — configura o ambiente MySQL local;
- `package.json` — define scripts e dependências do projeto.


# 5. Pré-requisitos

Antes de executar o projeto, verifique se você possui instalado:

- Node.js
- npm
- Git
- Docker e Docker Compose (opcional, para subir o MySQL)

# 6. Instalação

## 6.1 Clone o repositório

```bash
git clone <https://github.com/lara-peddinghausen/express_bd.git>
```

## 6.2 Acesse a pasta do projeto

```bash
cd express_bd
```

## 6.3 Instale as dependências

```bash
npm install
```


# 7. Configuração das Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto utilizando como referência o arquivo:

`.env.example`  

Exemplo:  
DB_USER=usuario_do_banco_de_dados  
DB_PASSWORD=senha_do_banco_de_dados    

**Importante:**  senhas, tokens, chaves de API e outras informações sensíveis não devem ser armazenadas no repositório Git.

O arquivo .env deve estar incluído no .gitignore.

# 8. Execução do Projeto

## Banco de dados com Docker

Para subir o MySQL localmente:

```bash
docker compose up -d
```

## Executando a aplicação

Modo de desenvolvimento:

```bash
npm run dev
```

## Execução direta

```bash
node src/server.js
```

Após iniciar a aplicação, o servidor ficará disponível em:

```bash
http://localhost:3000
```


# 9. Endpoints da API

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | `/` | Retorna uma mensagem inicial da API |
| GET | `/alunos` | Lista todos os alunos |
| GET | `/alunos/:id` | Busca um aluno pelo ID |
| POST | `/alunos` | Cadastra um novo aluno |
| PUT | `/alunos/:id` | Atualiza os dados de um aluno |
| DELETE | `/alunos/:id` | Remove um aluno pelo ID |
| GET | `/cursos` | Lista todos os cursos |
| GET | `/cursos/:id` | Busca um curso pelo ID |
| POST | `/cursos` | Cadastra um novo curso |
| PUT | `/cursos/:id` | Atualiza os dados de um curso |
| DELETE | `/cursos/:id` | Remove um curso pelo ID |


# 10. Exemplos de Requisição e Resposta

## Exemplo de requisição: cadastro de aluno

```http
POST /alunos
Content-Type: application/json
```

```json
{
  "nome": "Ana",
  "curso": "ADS"
}
```

## Exemplo de resposta do cadastro

```json
{
  "id": 5,
  "nome": "Ana",
  "curso": "ADS"
}
```

## Exemplo de listagem

```http
GET /alunos
```

```json
[
  { "id": 1, "nome": "Bruno", "curso": "ADS" },
  { "id": 2, "nome": "Maria", "curso": "ADS" }
]
```


# 11. Modelo de Dados

A API trabalha com as entidades `Aluno` e `Curso`. 

```bash
Aluno
├── id
├── nome
└── curso_id
```

```bash
Curso
├── id
└── nome

```


### Estrutura das entidades

Aluno:
- `id`: identificador do aluno;
- `nome`: nome do aluno;
- `curso_id`: curso do aluno.

Curso:
- `id`: identificador do aluno;
- `nome`: nome do curso;


# 12. Extras — Programação Web 2

- API REST desenvolvida com Express e Node.js;
- Persistência de dados em MySQL para estudo de CRUD;
- Estrutura simples para entendimento de rotas, requisições e respostas HTTP;
- Containerização do MySQL com Docker Compose para o ambiente de desenvolvimento;
- Para testes rápidos dos endpoints, é possível utilizar arquivos de requisições HTTP dentro do projeto, facilitando a execução de chamadas GET, POST, PUT e DELETE diretamente pelo editor.


# 13. Resposta - Exercício 10
Após compreender a diferença entre container e volume, execute:

```bash
docker compose down -v
```

Suba novamente:

```bash
docker compose up -d
```

Verifique o que aconteceu com:  
Tabela  
Dados  
Banco

Explique o resultado.

## Resposta:
A tabela e os dados foram apagados. O comando docker compose down -v remove os volumes que armazenam os dados. O banco também perde os dados que estavam guardados no volume, mas assim que o comando docker compose up -d é executado, o banco é recriado, porém como não existe mais o volume, ele não tem mais os dados que tinha antes.


# 14. Autor

**Nome:** Lara Peddinghausen  
**Turma:** ADS 2024.2N  
**Unidade Curricular:** Programação Web 2


# 15. Licença e Uso Acadêmico

Projeto desenvolvido para fins acadêmicos e de aprendizado na disciplina de Programação Web 2.

O código poderá ser utilizado para avaliação e acompanhamento acadêmico durante o curso.
