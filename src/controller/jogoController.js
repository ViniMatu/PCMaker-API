const JogoService = require("../service/jogoService");
const jogoService = new JogoService();

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
    const { ids } = request.params
    const allIds = ids.split("&")
    const jogo = await jogoService.getGame(allIds);
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
