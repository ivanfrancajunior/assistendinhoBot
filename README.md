
# ASSISTINDINHO-BOT
![Alt text](assets/assistendinhoBot.png)

## Descrição

Este é um bot para Twitch que foi desenvolvido para executar ações com base em comandos. Ele foi escrito utilizando a biblioteca tmi.js e a API do OMDb. Atualmente, o bot oferece recursos de busca de filmes, mas está disponível apenas em inglês.

## Funcionalidades

- Busca de Filmes: O bot permite realizar buscas por filmes utilizando a API do OMDb. Os comandos disponíveis são:

  - `!setfilme <título>`: Adiciona o filme a ser pesquisado.
  - `!filme `: Retorna informações sobre um filme selecionado.
  - `!duração `: Retorna informações sobre um filme específico.
  - `!tempo `: Retorna informações sobre um filme específico.
  - `!sinopse `: Retorna informações sobre um filme específico.

## Configuração

Antes de executar o bot, é necessário realizar algumas configurações. Siga as instruções abaixo:

1. Clone o repositório do bot para sua máquina local.
2. Instale as dependências utilizando o comando `npm install`.
3. Configure as seguintes variáveis de ambiente:

    - `TWITCH_BOT_NAME`: Nome de usuário da conta do Twitch.
    - `OAUTH_TOKEN`: Token de autenticação da conta do Twitch.
    - `OMDB_API_KEY`: Chave de API do OMDb.

## Execução

Após realizar as configurações necessárias, execute o bot utilizando o seguinte comando em seu terminal:

``npm start`` 

## Uso

Basta agora configurar o canal em q ele vai ficar monitorando e utilizar com base nos comandos antes descritos. 

## Refs: 

<a href='https://tmijs.com/'>**tmi.js**</a> - Documentação da biblioteca.

<a href='https://www.omdbapi.com/'>**OMDb APIs**</a> - Documentação da api.