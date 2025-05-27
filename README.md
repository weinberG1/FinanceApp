# FinanceApp - Aplicativo Financeiro de Controle de Gastos

Um aplicativo desenvolvido em React Native para gerenciamento de gastos.

## Pré-requisitos

- npm
- Node.js (versão 14 ou superior)
- Dispositivo móvel ou emulador
- Conta Firebase
- Expo CLI

## Instalação

1. Clone do repositório:
```bash
git clone https://github.com/weinberG1/FinanceApp.git
```

2. Instalação das dependências:
```bash
cd FinanceApp
npm install
```

3. Configuração do Firebase:
   - Crie um projeto no Firebase
   - Ative a autenticação
   - Configure o Firestore Database
   - Copie as credenciais do Firebase para o arquivo `firebase.js`

4. Inicie o aplicativo:
```bash
npm start
```

## No Aplicativo

1. **Login/Registro**
   - Faça login com email e senha
   - Use a opção "Esqueci a senha" se necessário

2. **Gerenciamento de Gastos**
   - Adicione novos gastos
   - Preencha descrição e valor
   - Visualize o total de gastos no topo
   - Edite ou exclua gastos

3. **Perfil do Usuário**
   - Acesse suas informações
   - Visualize dados da conta
   - Faça logout

