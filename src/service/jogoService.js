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
    return this.jogoRepository.getGame(id);
  }
}

module.exports = JogoService;
