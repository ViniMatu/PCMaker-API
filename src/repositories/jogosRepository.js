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

// async function testeAllGames(){
//   const games = new JogoRepository()
//   const allGames = await games.getAllGames()
//   console.log(allGames)
// }
// testeAllGames()

// async function testeIdGame(idGame){
//   const games = new JogoRepository()
//   const result = await games.getGame(idGame)
//   console.log(result)
// }
// testeIdGame(12)

module.exports = JogoRepository;