# PCMaker-API
API para o Projeto do PCMaker

Pode ser utilizada apartir dos seguintes Endpoints:
    --> https://pcmakerapi.onrender.com/api/games
        --> Retorna tanto os jogos quanto as suas informações que estão no banco de dados
    
    --> https://pcmakerapi.onrender.com/api/games/:ids
        --> Retorna jogos específicos com base nos Ids enviados
        --> Separe os Ids por '&'
        --> Exemplo: https://pcmakerapi.onrender.com/api/games/1&2&3
    
    --> https://pcmakerapi.onrender.com/api/idGames
        --> Retorna apenas os Ids de todos os jogos

    --> https://pcmakerapi.onrender.com/api/recommend/:ids
        --> Retorna uma recomendação de acordo com os jogos desejados
        --> Ids devem ser separados por '&'
        --> Exemplo: https://pcmakerapi.onrender.com/api/recommend/1&2&3