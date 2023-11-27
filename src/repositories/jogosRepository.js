const DB = require('../database/database.js');
const db = new DB()

class JogoRepository {
  constructor() {}

  async getAllGames(){
    try{
      const query = `SELECT 
                      games_req.ID,
                      games_req.name,
                      games_req.image,
                      games_req.cpu_min,
                      games_req.gpu_min,
                      games_req.ram_min,
                      games_req.cpu_req,
                      games_req.gpu_req,
                      games_req.ram_req,
                      cpu_min.type AS "cpu_min.Type",
                      cpu_min.cpu_id AS "cpu_min.id",
                      cpu_min.brand AS "cpu_min.Brand",
                      cpu_min.model AS "cpu_min.Model",
                      cpu_min.benchmark_score AS "cpu_min.Benchmark_score",
                      cpu_min.benchmark_link AS "cpu_min.Benchmark_link",
                      gpu_min.type AS "gpu_min.Type",
                      gpu_min.gpu_id AS "gpu_min.id",
                      gpu_min.brand AS "gpu_min.Brand",
                      gpu_min.model AS "gpu_min.Model",
                      gpu_min.benchmark_score AS "gpu_min.Benchmark_score",
                      gpu_min.benchmark_link AS "gpu_min.Benchmark_link",
                      cpu_req.type AS "cpu_req.Type",
                      cpu_req.cpu_id AS "cpu_req.id",
                      cpu_req.brand AS "cpu_req.Brand",
                      cpu_req.model AS "cpu_req.Model",
                      cpu_req.benchmark_score AS "cpu_req.Benchmark_score",
                      cpu_req.benchmark_link AS "cpu_req.Benchmark_link",
                      gpu_req.type AS "gpu_req.Type",
                      gpu_req.gpu_id AS "gpu_req.id",
                      gpu_req.brand AS "gpu_req.Brand",
                      gpu_req.model AS "gpu_req.Model",
                      gpu_req.benchmark_score AS "gpu_req.Benchmark_score",
                      gpu_req.benchmark_link AS "gpu_req.Benchmark_link"
                      FROM games_req
                      LEFT JOIN cpu AS cpu_min ON games_req.cpu_min = cpu_min.cpu_id
                      LEFT JOIN cpu AS cpu_req ON games_req.cpu_req = cpu_req.cpu_id
                      LEFT JOIN gpu AS gpu_min ON games_req.gpu_min = gpu_min.gpu_id
                      LEFT JOIN gpu AS gpu_req ON games_req.gpu_req = gpu_req.gpu_id;`
      const result = await db.makeQuery(query)
      const modifiedData = result.map(item => this.reorganizeObject(item));
      return modifiedData
    } catch (e){
      console.log("Erro ao pegar todos os jogos: ", e)
      throw e
    }
  }

  reorganizeObject(obj) {
    const jogoModificado = { ...obj };
  
    // Organiza as chaves aninhadas para um novo objeto
    jogoModificado.cpu_min = {
      Type: jogoModificado['cpu_min.Type'],
      id: jogoModificado['cpu_min.id'],
      Brand: jogoModificado['cpu_min.Brand'],
      Model: jogoModificado['cpu_min.Model'],
      Benchmark_Score: jogoModificado['cpu_min.Benchmark_score'],
      Benchmark_Link: jogoModificado['cpu_min.Benchmark_link'],
    };
    
    jogoModificado.gpu_min = {
        Type: jogoModificado['gpu_min.Type'],
        id: jogoModificado['gpu_min.id'],
        Brand: jogoModificado['gpu_min.Brand'],
        Model: jogoModificado['gpu_min.Model'],
        Benchmark_Score: jogoModificado['gpu_min.Benchmark_score'],
        Benchmark_Link: jogoModificado['gpu_min.Benchmark_link'],
    };

    jogoModificado.cpu_req = {
      Type: jogoModificado['cpu_req.Type'],
      id: jogoModificado['cpu_req.id'],
      Brand: jogoModificado['cpu_req.Brand'],
      Model: jogoModificado['cpu_req.Model'],
      Benchmark_Score: jogoModificado['cpu_req.Benchmark_score'],
      Benchmark_Link: jogoModificado['cpu_req.Benchmark_link'],
    };

    jogoModificado.gpu_req = {
        Type: jogoModificado['gpu_req.Type'],
        id: jogoModificado['gpu_req.id'],
        Brand: jogoModificado['gpu_req.Brand'],
        Model: jogoModificado['gpu_req.Model'],
        Benchmark_Score: jogoModificado['gpu_req.Benchmark_score'],
        Benchmark_Link: jogoModificado['gpu_req.Benchmark_link'],
    };
    
    // Remove as chaves antigas
    delete jogoModificado['cpu_min.Type'];
    delete jogoModificado['cpu_min.id'];
    delete jogoModificado['cpu_min.Brand'];
    delete jogoModificado['cpu_min.Model'];
    delete jogoModificado['cpu_min.Benchmark_score'];
    delete jogoModificado['cpu_min.Benchmark_link'];
    
    delete jogoModificado['gpu_min.Type'];
    delete jogoModificado['gpu_min.id'];
    delete jogoModificado['gpu_min.Brand'];
    delete jogoModificado['gpu_min.Model'];
    delete jogoModificado['gpu_min.Benchmark_score'];
    delete jogoModificado['gpu_min.Benchmark_link'];

    delete jogoModificado['cpu_req.Type'];
    delete jogoModificado['cpu_req.id'];
    delete jogoModificado['cpu_req.Brand'];
    delete jogoModificado['cpu_req.Model'];
    delete jogoModificado['cpu_req.Benchmark_score'];
    delete jogoModificado['cpu_req.Benchmark_link'];
   
    delete jogoModificado['gpu_req.Type'];
    delete jogoModificado['gpu_req.id'];
    delete jogoModificado['gpu_req.Brand'];
    delete jogoModificado['gpu_req.Model'];
    delete jogoModificado['gpu_req.Benchmark_score'];
    delete jogoModificado['gpu_req.Benchmark_link'];
    
    return jogoModificado;
  }

  async getGame(idGame) {
    try{
      const query = `SELECT 
                    games_req.ID,
                    games_req.name,
                    games_req.image,
                    games_req.cpu_min,
                    games_req.gpu_min,
                    games_req.ram_min,
                    games_req.cpu_req,
                    games_req.gpu_req,
                    games_req.ram_req,
                    cpu_min.type AS "cpu_min.Type",
                    cpu_min.cpu_id AS "cpu_min.id",
                    cpu_min.brand AS "cpu_min.Brand",
                    cpu_min.model AS "cpu_min.Model",
                    cpu_min.benchmark_score AS "cpu_min.Benchmark_score",
                    cpu_min.benchmark_link AS "cpu_min.Benchmark_link",
                    gpu_min.type AS "gpu_min.Type",
                    gpu_min.gpu_id AS "gpu_min.id",
                    gpu_min.brand AS "gpu_min.Brand",
                    gpu_min.model AS "gpu_min.Model",
                    gpu_min.benchmark_score AS "gpu_min.Benchmark_score",
                    gpu_min.benchmark_link AS "gpu_min.Benchmark_link",
                    cpu_req.type AS "cpu_req.Type",
                    cpu_req.cpu_id AS "cpu_req.id",
                    cpu_req.brand AS "cpu_req.Brand",
                    cpu_req.model AS "cpu_req.Model",
                    cpu_req.benchmark_score AS "cpu_req.Benchmark_score",
                    cpu_req.benchmark_link AS "cpu_req.Benchmark_link",
                    gpu_req.type AS "gpu_req.Type",
                    gpu_req.gpu_id AS "gpu_req.id",
                    gpu_req.brand AS "gpu_req.Brand",
                    gpu_req.model AS "gpu_req.Model",
                    gpu_req.benchmark_score AS "gpu_req.Benchmark_score",
                    gpu_req.benchmark_link AS "gpu_req.Benchmark_link"
                    FROM games_req
                    LEFT JOIN cpu AS cpu_min ON games_req.cpu_min = cpu_min.cpu_id
                    LEFT JOIN cpu AS cpu_req ON games_req.cpu_req = cpu_req.cpu_id
                    LEFT JOIN gpu AS gpu_min ON games_req.gpu_min = gpu_min.gpu_id
                    LEFT JOIN gpu AS gpu_req ON games_req.gpu_req = gpu_req.gpu_id
                    WHERE ${idGame} = games_req.ID;`
      const result = await db.makeQuery(query)
      const jogoModificado = result.map(item => this.reorganizeObject(item));
      return jogoModificado[0]
    } catch (e){
      console.log("Erro ao pegar id especifico do jogo: ", e)
      throw e
    }
  }

  async getIdGames(){
    try{
      const query = `SELECT games.id, games.name FROM games_req AS games`
      const result = await db.makeQuery(query)
      return result
    } catch (e){
      console.log("Erro ao tentar pegar os Ids dos jogos: ", e)
      throw e
    }
  }
}

module.exports = JogoRepository;