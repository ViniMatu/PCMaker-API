const DB = require('../database/connectDatabase.js');
const db = new DB()

class JogoRepository {
  constructor() {}

  async getAllGames(){
    const query = "SELECT * FROM games"
    const result = await db.makeQuery(query)
    return result
  }

  async getGame(idGame) {
    const query = `SELECT * FROM games WHERE ${idGame} = games.id`
    const result = await db.makeQuery(query)
    return result
  }
}

module.exports = JogoRepository;