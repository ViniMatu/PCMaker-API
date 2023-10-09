const JogoRepository = require("../repositories/jogosRepository");
const jogoRepository = new JogoRepository();

class JogoService {
  constructor() {
    this.jogoRepository = jogoRepository;
  }

  async getAllGames() {
    return this.jogoRepository.getAllGames();
  }

  async getGame(id) {
    return this.jogoRepository.getGame((id = id));
  }
}

module.exports = JogoService;
