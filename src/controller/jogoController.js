const JogoService = require("../service/jogoService");
const jogoService = new JogoService("../database/jogos.json");

const getAllGames = async (request, response) => {
  try{
    const jogos = await jogoService.getAllGames();
    return response.status(200).json(jogos);
  } catch(e){
    console.log(`Erro ao acesar o serviço de jogos ${e}`)
    throw e
  }
};

const getGame = async (request, response) => {
  try{
    let id = request.params.id;
    const jogo = await jogoService.getGame(id);
    return response.status(200).json(jogo);
  } catch (e){
    console.log("Erro ao acessar o serviço de jogos; ", e)
    throw e
  }
};

const getIdGame = async (request, response) => {
  try{
    const jogos = await jogoService.getIdGame()
    return response.status(200).json(jogos)
  }catch (e){
    console.log("Erro ao acessar o serviço de jogos: ", e)
    throw e
  }
}

module.exports = {
  getAllGames,
  getGame,
  getIdGame,
};
