# Front-Admin

O `front-admin` será a interface de administração para os restaurantes gerenciarem seus cardápios, pedidos e configurações. As funcionalidades principais incluem:

## Funcionalidades

1. **Login de Restaurantes**
   - Tela de login onde os restaurantes podem inserir e-mail e senha.
   - Integração com o endpoint `POST /auth/login` para autenticação.

2. **Gerenciamento de Cardápio**
   - Tela para listar itens do cardápio (`GET /menu`).
   - Formulário para adicionar (`POST /menu`) e editar (`PUT /menu/:id`) itens do cardápio.
   - Opção para remover itens do cardápio (`DELETE /menu/:id`).

3. **Recebimento de Pedidos**
   - Tela para visualizar pedidos recebidos.
   - Notificações em tempo real para novos pedidos usando WebSockets.

4. **Visualização de Relatórios**
   - Tela para exibir relatórios de vendas diárias, semanais e mensais (`GET /reports`).

5. **Configurações do Restaurante**
   - Tela para gerenciar configurações do restaurante, como informações de contato e tipo de cozinha. 