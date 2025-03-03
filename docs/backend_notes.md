# Notas sobre o Backend do Sistema de Delivery

## Estrutura Geral
O backend será construído utilizando NestJS e terá como objetivo gerenciar as operações relacionadas a restaurantes, menus e pedidos. Abaixo estão as principais funcionalidades e considerações para a implementação.

## Funcionalidades Principais

### 1. Cadastro de Restaurantes
- **Endpoint**: `POST /restaurants`
- **Dados**: Nome, Endereço, Telefone, Tipo de Cozinha.
- **Autenticação**: Utilizar JWT para proteger as rotas.

### 2. Login de Restaurantes
- **Endpoint**: `POST /auth/login`
- **Dados**: E-mail e senha.
- **Retorno**: Token JWT para autenticação.

### 3. Gerenciamento de Cardápio
- **Endpoints**:
  - `GET /menu`: Listar itens do cardápio.
  - `POST /menu`: Adicionar um novo item ao cardápio.
  - `PUT /menu/:id`: Editar um item do cardápio.
  - `DELETE /menu/:id`: Remover um item do cardápio.
- **Dados do Item**: Nome, Descrição, Preço, Imagem, Categoria.

### 4. Recebimento de Pedidos
- **Endpoint**: `POST /orders`
- **Dados**: Itens do pedido, ID do restaurante, ID do usuário.
- **Notificações**: Usar WebSockets para notificar restaurantes sobre novos pedidos.

### 5. Visualização de Relatórios
- **Endpoint**: `GET /reports`
- **Dados**: Relatórios de vendas diárias, semanais e mensais.

### 6. Métodos de Pagamento
- **Integração**: Pagamento manual, onde o cliente paga no momento da entrega.

### 7. Endereço de Entrega
- **Endpoints**:
  - `POST /addresses`: Cadastrar um novo endereço.
  - `GET /addresses`: Listar endereços cadastrados.

### Login Necessário

1. **Restaurantes**:
   - **Login**: O sistema requer que os restaurantes façam login usando e-mail e senha para acessar suas funcionalidades, como gerenciar o cardápio e visualizar pedidos.
   - **Endpoint**: `POST /auth/login` para autenticação.

2. **Clientes**:
   - O sistema não especifica a necessidade de login para os clientes. Isso significa que os clientes podem fazer pedidos sem a necessidade de criar uma conta ou fazer login, a menos que você decida implementar essa funcionalidade.
   - **Considerações**: Se você quiser que os clientes tenham uma experiência mais personalizada (como salvar endereços, visualizar histórico de pedidos, etc.), pode ser interessante implementar um sistema de login para eles também. Caso contrário, o sistema pode permitir que os clientes façam pedidos como convidados, o que pode simplificar o processo de compra.

## Considerações Técnicas
- **Banco de Dados**: Utilizar PostgreSQL para armazenar informações de restaurantes, usuários, menus e pedidos.
- **Segurança**: Implementar validação de entrada e tratamento de erros para evitar injeções de SQL e outros ataques.
- **Documentação**: Usar Swagger para documentar a API, facilitando o uso por desenvolvedores.
- **Testes**: Implementar testes unitários e de integração para garantir a qualidade do código.

## Conclusão
O backend será projetado para ser robusto e escalável, permitindo que restaurantes gerenciem seus cardápios e pedidos de forma eficiente, enquanto proporciona uma experiência de usuário fluida.

### Tecnologia
- **Framework**: NestJS (versão mais estável).
- **Banco de Dados**: PostgreSQL.
- **Autenticação**: JWT com Argon2 para hashing de senhas.

### Documentação
- **Documentação da API**: Usar Swagger para documentar a API, facilitando o uso por desenvolvedores.

### Testes
- **Framework**: Jest para testes unitários e de integração.

## Padrões de Projeto

### Arquitetura
- **Arquitetura Modular**: Organizar a aplicação em módulos, cada um responsável por uma funcionalidade específica.

### Padrão de Repositório
- **Uso do Padrão de Repositório**: Abstrair a lógica de acesso a dados para facilitar a manutenção e a escalabilidade.

### DTOs (Data Transfer Objects)
- **Uso de DTOs**: Definir a forma dos dados enviados e recebidos nas requisições e respostas da API.

### Tratamento de Erros
- **Tratamento Centralizado de Erros**: Implementar um mecanismo centralizado para capturar e gerenciar erros de forma consistente.

### Registro de Logs
- **Integração de Logs**: Integrar um sistema de registro para capturar eventos e erros da aplicação, facilitando a depuração e monitoramento.

### Versionamento da API
- **Planejamento de Versionamento**: Implementar versionamento da API para gerenciar mudanças sem quebrar clientes existentes.

## Padrões de Testes
- **Testes Unitários**: Implementar testes unitários para verificar a funcionalidade de componentes individuais, utilizando Jest.
- **Testes de Integração**: Realizar testes de integração para garantir que diferentes partes do sistema funcionem bem juntas.
- **Cobertura de Testes**: Monitorar a cobertura de testes para garantir que uma parte significativa do código esteja sendo testada.