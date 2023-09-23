const JogoRepository = require('../repositories/jogosRepository')
const jogoRepository = new JogoRepository()

class JogoService{
    constructor(){
        this.jogoRepository = jogoRepository
    }

    async getAll(){
        return this.jogoRepository.getAll()
    }

}

module.exports = JogoService