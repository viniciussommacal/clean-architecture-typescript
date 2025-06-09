# Clean Architecture TypeScript

## 📚 Sobre

Repositório com implementação de clean architecture utilizando TypeScript.
O projeto consiste em um assistente de loja virtual, que responde perguntas gerais
sobre a loja de eletrônicos TESLA e consulta produtos em uma base de dados estática.

## 🛠 Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- Node.js
- [OpenAI](https://www.npmjs.com/package/openai)
- [Express](https://expressjs.com/pt-br/)
- Jest (para testes unitários)

---

## 💡 Como usar

1. Clone o repositório:

   ```bash
   git clone https://github.com/viniciussommacal/clean-architeture-typescript.git
   cd clean-architeture-typescript
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` seguindo o modelo presente em `.env.example` e atribua sua chave da OpenAI em `OPENAI_API_KEY`.

4. Execute o projeto:

   ```bash
   npm run dev
   ```

5. Teste a API usando cURL:

   ```bash
   curl --location 'http://localhost:3000/assistant' \
   --header 'Content-Type: application/json' \
   --data '{
       "question": "Qual o horário de atendimento?"
   }'
   ```

6. Para executar os testes:
   ```bash
   npm run test
   ```
