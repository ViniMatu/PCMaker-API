const { readFile } = require("fs/promises");
const file = "./src/database/jogos.json";

class JogoRepository {
  constructor() {
    this.file = file;
  }

  async __readFile() {
    return JSON.parse(await readFile(this.file));
  }

  async getAllGames() {
    const all = await this.__readFile();
    if (all) return all;

    return null;
  }

  async getGame(idGame) {
    const allGames = await this.__readFile();
    return allGames.find((game) => {
      if (parseInt(idGame) === game.app.appid) {
        console.log(game);
        return game;
      }
    });
  }
}

const jogosRepository = new JogoRepository({
  file: "./src/database/jogos.json",
});

// jogosRepository.find(1).then(console.log).catch(err => console.log(err))

module.exports = JogoRepository;
