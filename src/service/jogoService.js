const JogoRepository = require("../repositories/jogosRepository");
const jogoRepository = new JogoRepository();

class JogoService {
  constructor() {
    this.jogoRepository = jogoRepository;
  }

  async getAllGames() {
    try{
      return this.jogoRepository.getAllGames();
    } catch (e){
      console.log("Erro ao acessar o repositório: ", e)
      throw e
    }
  }

  async getGame(id) {
    try{
      return this.jogoRepository.getGame(id);
    } catch(e){
      console.log("Erro ao accessar o repositorio: ", e)
      throw e
    }
  }

  async getIdGame(){
    try{
      return this.jogoRepository.getIdGames()
    } catch (e){
      console.log("Erro ao acessar o repositorio: ", e)
      throw e
    }
  }
}

module.exports = JogoService;
