const JogoRepository = require('../repositories/jogosRepository')
const jogoRepository = new JogoRepository()

class JogoService{
    constructor() {
        this.jogoRepository = jogoRepository
    }

    async getAll() {
        return this.jogoRepository.getAll()
    }

    async getGame(id){
        return this.jogoRepository.getGame(id);
    }

}

module.exports = JogoService