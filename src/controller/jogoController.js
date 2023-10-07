const JogoService = require('../service/jogoService')
const jogoService = new JogoService('../database/jogos.json')

const getAllGames = async (request, response) =>{
    const jogos = await jogoService.getAll()
    return response.status(200).json(jogos)
}

module.exports = {
    getAllGames
}