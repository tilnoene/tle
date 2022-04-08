<h1 align="center">
    <img alt="TLE Banner" src="./assets/banner.svg" />
</h1>

<div align="center">
  <img alt="NodeJS" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="Discord" src="https://img.shields.io/badge/%3CServer%3E-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white" />
</div>

## 🛠 Configuração

Instalar as dependências:
```
yarn install
```

Configurar o `.env` (contém exemplo também no arquivo `.env.example`)
```
DISCORD_TOKEN = "discord token"
CLIENT_ID = "client id"
GUILD_ID = "guild id"
SERVER_ID = "server id"
HANDLE_SPLIT = "handle split (se o usuário possui handles distintas no codeforces e atcoder)"
CONTEST_CHANNEL_ID = "id do canal de anúncio dos contests"

GITHUB_EMOJI_ID = "id emoji github"
TELEGRAM_EMOJI_ID = "id emoji telegram"
BALLOON_WHITE_EMOJI_ID = "id emoji white balloon"
CODEFORCES_EMOJI_ID = "id emoji codeforces"
```

Convidar o bot para o servidor
1. Selecione as permissões no [Discord Permissions Calculator](https://discordapi.com/permissions.html#2081058032) (todas de cor amarela)
2. Inserir o Client ID
3. Acessar o link gerado pelo site, selecionar o servidor e aprovar a entrada do bot

## 🧰 Inicialização

Iniciar o bot
```
yarn start
```

Iniciar no modo de desenvolvimento com nodemon (auto refresh)
```
yarn start:dev
```

## ❓ Comandos

_Os comandos também são listados com o comando `/help`_

- `/help`: Comandos e informações sobre o bot.
- `/links`: Links de acesso rápido.
- `/rating [handle]`: Retorna rating do usuário.
- `/refresh`: Atualiza seu cargo de acordo com o ranking.

## ⚙️ Funcionalidades

- Atualiza a cor do nome de usuário de acordo com o rating nos sites Codeforces e AtCoder (necessário ter cargos com o nome de cada ranking).
- Agenda eventos de contests no Codeforces e AtCoder futuros automaticamente no servidor.
- Possibilidade de agendar eventos de contests por mensagem.
- Visualização do rating dos usuários nos sites Codeforces e AtCoder.
- Salvar links para acesso rápido de sites, materiais e grupos de estudo.

## 💻 Contribuidores

<table>
  <tr>
    <td align="center"><a href="https://github.com/tilnoene" target="_blank"><img style="border-radius: 50%;" src="https://github.com/tilnoene.png" width="100px;" alt="Victor Manuel"/><br /><sub><b>Victor Manuel</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/nathaliaop" target="_blank"><img style="border-radius: 50%;" src="https://github.com/nathaliaop.png" width="100px;" alt="Nathália Pereira"/><br /><sub><b>Nathália Pereira</b></sub></a><br /></td>
</table>