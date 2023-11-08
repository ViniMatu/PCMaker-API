const DB = require('../database/connectDatabase.js');
const db = new DB()

class JogoRepository {
  constructor() {}

  async getAllGames(){
    try{
      const query = "SELECT * FROM games"
      const result = await db.makeQuery(query)
      return result
    } catch (e){
      console.log("Erro ao pegar todos os jogos: ", e)
      throw e
    }
  }

  async getGame(idGame) {
    try{
      const query = `SELECT * FROM games WHERE ${idGame} = games.id`
      const result = await db.makeQuery(query)
      return result
    } catch (e){
      console.log("Erro ao pegar id especifico do jogo: ", e)
      throw e
    }
  }
}

module.exports = JogoRepository;