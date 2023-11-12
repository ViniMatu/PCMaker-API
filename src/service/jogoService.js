const JogoRepository = require("../repositories/jogosRepository");
const jogoRepository = new JogoRepository();

class JogoService {
  constructor() {}

  async getAllGames() {
    try{
      return jogoRepository.getAllGames();
    } catch (e){
      console.log("Erro ao acessar o repositório: ", e)
      throw e
    }
  }

  async getGame(ids) {
    try{
      let games = []

      for(let i=0; i<ids.length;i++)
        games.push(await jogoRepository.getGame(ids[i]))

      return games;
    } catch(e){
      console.log("Erro ao accessar o repositorio: ", e)
      throw e
    }
  }

  async getIdGame(){
    try{
      return jogoRepository.getIdGames()
    } catch (e){
      console.log("Erro ao acessar o repositorio: ", e)
      throw e
    }
  }
}

module.exports = JogoService;
