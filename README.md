# TLE
A Discord BOT to check status on Competitive Programming sites.<br />
Um BOT para checar status nos sites de Programação Competitiva.

### ⚙️ Comandos
`-help`: lista com os comandos e informações adicionais.<br />
`-rating [handle]`: informa o rating do usuário informado de acordo com os sites Codeforces e AtCoder. Se não houver o parâmetro "handle", é considerado o nickname de quem enviou a mensagem.<br />
`-refresh`: atualiza o seu cargo de acordo com o ranking nos sites Codeforces e AtCoder.

### 🔨 Como utilizar
`yarn install` para instalar as dependências<br />
`yarn start` para iniciar o BOT em modo de produção<br />
`yarn dev` para rodar a versão de desenvolvedor (com nodemon)

É necessário conter um arquivo `.env` contendo as seguintes variáveis de ambiente:

`DISCORD_TOKEN = [token do BOT]`<br />
`SERVER_ID = [ID do servidor]`<br />
`PREFIX = [prefixo]`

Para gerar um link de convite para o BOT basta entrar entrar [neste site](https://discordapi.com/permissions.html#8), selecionar as permissões e inserir o Client ID.

Para atualização automática dos cargos de acordo com o ranking é necessário existir cargos com o mesmo nome dos rankings no servidor.

### ✍️ O que há de novo?

### v2.0
 - handle é um parâmetro opcional no comando `-rating`
 - atualização automática a cada 1 hora
 - não atualiza o cargo caso o usuário permaneça com o ranking anterior
 - substitui a biblioteca `request-express`, já obsoleta, pelo `axios`
 - intervalo de 500ms para as requisições do Codeforces

### v1.0
 - atualização automática dos cargos de acordo com o ranking a cada minuto
 - integração com o site Codeforces e AtCoder
 - comando para informar o rating do usuário