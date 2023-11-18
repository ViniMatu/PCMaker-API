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
                    cpu_min.Type AS "cpu_min.Type",
                    cpu_min.Id AS "cpu_min.id",
                    cpu_min.Brand AS "cpu_min.Brand",
                    cpu_min.Model AS "cpu_min.Model",
                    cpu_min.Benchmark AS "cpu_min.Benchmark",
                    cpu_min.URL AS "cpu_min.URL",
                    gpu_min.Type AS "gpu_min.Type",
                    gpu_min.Id AS "gpu_min.id",
                    gpu_min.Brand AS "gpu_min.Brand",
                    gpu_min.Model AS "gpu_min.Model",
                    gpu_min.Benchmark AS "gpu_min.Benchmark",
                    gpu_min.URL AS "gpu_min.URL",
                    ram_min.type AS "ram_min.Type",
                    ram_min.ram_id AS "ram_min.Id",
                    ram_min.brand AS "ram_min.Brand",
                    ram_min.model AS "ram_min.Model",
                    ram_min.size AS "ram_min.Size",
                    ram_min.frequency AS "ram_min.Frequency",
                    ram_min.benchmark_score AS "ram_min.Benchmark_score",
                    ram_min.benchmark_link AS "ram_min.Benchmark_link", 
                    cpu_req.Type AS "cpu_req.Type",
                    cpu_req.Id AS "cpu_req.id",
                    cpu_req.Brand AS "cpu_req.Brand",
                    cpu_req.Model AS "cpu_req.Model",
                    cpu_req.Benchmark AS "cpu_req.Benchmark",
                    cpu_req.URL AS "cpu_req.URL",
                    gpu_req.Type AS "gpu_req.Type",
                    gpu_req.Id AS "gpu_req.id",
                    gpu_req.Brand AS "gpu_req.Brand",
                    gpu_req.Model AS "gpu_req.Model",
                    gpu_req.Benchmark AS "gpu_req.Benchmark",
                    gpu_req.URL AS "gpu_req.URL",
                    ram_req.type AS "ram_req.Type",
                    ram_req.ram_id AS "ram_req.Id",
                    ram_req.brand AS "ram_req.Brand",
                    ram_req.model AS "ram_req.Model",
                    ram_req.size AS "ram_req.Size",
                    ram_req.frequency AS "ram_req.Frequency",
                    ram_req.benchmark_score AS "ram_req.Benchmark_score",
                    ram_req.benchmark_link AS "ram_req.Benchmark_link" 
                    FROM games_req
                    LEFT JOIN CPU_Link AS cpu_min ON games_req.cpu_min = cpu_min.id
                    LEFT JOIN CPU_Link AS cpu_req ON games_req.cpu_req = cpu_req.id
                    LEFT JOIN GPU_Link AS gpu_min ON games_req.gpu_min = gpu_min.id
                    LEFT JOIN GPU_Link AS gpu_req ON games_req.gpu_req = gpu_req.id
                    LEFT JOIN ram AS ram_min ON games_req.ram_min = ram_min.ram_id
                    LEFT JOIN ram AS ram_req ON games_req.ram_req = ram_req.ram_id`
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
      Benchmark: jogoModificado['cpu_min.Benchmark'],
      URL: jogoModificado['cpu_min.URL'],
    };
    
    jogoModificado.gpu_min = {
        Type: jogoModificado['gpu_min.Type'],
        id: jogoModificado['gpu_min.id'],
        Brand: jogoModificado['gpu_min.Brand'],
        Model: jogoModificado['gpu_min.Model'],
        Benchmark: jogoModificado['gpu_min.Benchmark'],
        URL: jogoModificado['gpu_min.URL'],
    };

    jogoModificado.ram_min = {
        Type: jogoModificado['ram_min.Type'],
        id: jogoModificado['ram_min.Id'],
        Brand: jogoModificado['ram_min.Brand'],
        Model: jogoModificado['ram_min.Model'],
        Size: jogoModificado['ram_req.Size'],
        Benchmark_Score: jogoModificado['ram_min.Benchmark_score'],
        Benchmark_Link: jogoModificado['ram_min.Benchmark_link'],
    };
    

    jogoModificado.cpu_req = {
      Type: jogoModificado['cpu_req.Type'],
      id: jogoModificado['cpu_req.id'],
      Brand: jogoModificado['cpu_req.Brand'],
      Model: jogoModificado['cpu_req.Model'],
      Benchmark: jogoModificado['cpu_req.Benchmark'],
      URL: jogoModificado['cpu_req.URL'],
    };

    jogoModificado.gpu_req = {
        Type: jogoModificado['gpu_req.Type'],
        id: jogoModificado['gpu_req.id'],
        Brand: jogoModificado['gpu_req.Brand'],
        Model: jogoModificado['gpu_req.Model'],
        Benchmark: jogoModificado['gpu_req.Benchmark'],
        URL: jogoModificado['gpu_req.URL'],
    };

    jogoModificado.ram_req = {
        Type: jogoModificado['ram_req.Type'],
        id: jogoModificado['ram_req.Id'],
        Brand: jogoModificado['ram_req.Brand'],
        Model: jogoModificado['ram_req.Model'],
        Size: jogoModificado['ram_req.Size'],
        Benchmark_Score: jogoModificado['ram_req.Benchmark_score'],
        Benchmark_Link: jogoModificado['ram_req.Benchmark_link'],
    };
    
    // Remove as chaves antigas
    delete jogoModificado['cpu_min.Type'];
    delete jogoModificado['cpu_min.id'];
    delete jogoModificado['cpu_min.Brand'];
    delete jogoModificado['cpu_min.Model'];
    delete jogoModificado['cpu_min.Benchmark'];
    delete jogoModificado['cpu_min.URL'];
    
    delete jogoModificado['gpu_min.Type'];
    delete jogoModificado['gpu_min.id'];
    delete jogoModificado['gpu_min.Brand'];
    delete jogoModificado['gpu_min.Model'];
    delete jogoModificado['gpu_min.Benchmark'];
    delete jogoModificado['gpu_min.URL'];
    
    delete jogoModificado['ram_min.Type'];
    delete jogoModificado['ram_min.Id'];
    delete jogoModificado['ram_min.Brand'];
    delete jogoModificado['ram_min.Model'];
    delete jogoModificado['ram_min.Size'];
    delete jogoModificado['ram_min.Frequency'];
    delete jogoModificado['ram_min.Benchmark_score'];
    delete jogoModificado['ram_min.Benchmark_link'];

    delete jogoModificado['cpu_req.Type'];
    delete jogoModificado['cpu_req.id'];
    delete jogoModificado['cpu_req.Brand'];
    delete jogoModificado['cpu_req.Model'];
    delete jogoModificado['cpu_req.Benchmark'];
    delete jogoModificado['cpu_req.URL'];
   
    delete jogoModificado['gpu_req.Type'];
    delete jogoModificado['gpu_req.id'];
    delete jogoModificado['gpu_req.Brand'];
    delete jogoModificado['gpu_req.Model'];
    delete jogoModificado['gpu_req.Benchmark'];
    delete jogoModificado['gpu_req.URL'];
  
    delete jogoModificado['ram_req.Type'];
    delete jogoModificado['ram_req.Id'];
    delete jogoModificado['ram_req.Brand'];
    delete jogoModificado['ram_req.Model'];
    delete jogoModificado['ram_req.Size'];
    delete jogoModificado['ram_req.Frequency'];
    delete jogoModificado['ram_req.Benchmark_score'];
    delete jogoModificado['ram_req.Benchmark_link'];
    
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
                    cpu_min.Type AS "cpu_min.Type",
                    cpu_min.Id AS "cpu_min.id",
                    cpu_min.Brand AS "cpu_min.Brand",
                    cpu_min.Model AS "cpu_min.Model",
                    cpu_min.Benchmark AS "cpu_min.Benchmark",
                    cpu_min.URL AS "cpu_min.URL",
                    gpu_min.Type AS "gpu_min.Type",
                    gpu_min.Id AS "gpu_min.id",
                    gpu_min.Brand AS "gpu_min.Brand",
                    gpu_min.Model AS "gpu_min.Model",
                    gpu_min.Benchmark AS "gpu_min.Benchmark",
                    gpu_min.URL AS "gpu_min.URL",
                    ram_min.type AS "ram_min.Type",
                    ram_min.ram_id AS "ram_min.Id",
                    ram_min.brand AS "ram_min.Brand",
                    ram_min.model AS "ram_min.Model",
                    ram_min.size AS "ram_min.Size",
                    ram_min.frequency AS "ram_min.Frequency",
                    ram_min.benchmark_score AS "ram_min.Benchmark_score",
                    ram_min.benchmark_link AS "ram_min.Benchmark_link", 
                    cpu_req.Type AS "cpu_req.Type",
                    cpu_req.Id AS "cpu_req.id",
                    cpu_req.Brand AS "cpu_req.Brand",
                    cpu_req.Model AS "cpu_req.Model",
                    cpu_req.Benchmark AS "cpu_req.Benchmark",
                    cpu_req.URL AS "cpu_req.URL",
                    gpu_req.Type AS "gpu_req.Type",
                    gpu_req.Id AS "gpu_req.id",
                    gpu_req.Brand AS "gpu_req.Brand",
                    gpu_req.Model AS "gpu_req.Model",
                    gpu_req.Benchmark AS "gpu_req.Benchmark",
                    gpu_req.URL AS "gpu_req.URL",
                    ram_req.type AS "ram_req.Type",
                    ram_req.ram_id AS "ram_req.Id",
                    ram_req.brand AS "ram_req.Brand",
                    ram_req.model AS "ram_req.Model",
                    ram_req.size AS "ram_req.Size",
                    ram_req.frequency AS "ram_req.Frequency",
                    ram_req.benchmark_score AS "ram_req.Benchmark_score",
                    ram_req.benchmark_link AS "ram_req.Benchmark_link" 
                    FROM games_req
                    LEFT JOIN CPU_Link AS cpu_min ON games_req.cpu_min = cpu_min.id
                    LEFT JOIN CPU_Link AS cpu_req ON games_req.cpu_req = cpu_req.id
                    LEFT JOIN GPU_Link AS gpu_min ON games_req.gpu_min = gpu_min.id
                    LEFT JOIN GPU_Link AS gpu_req ON games_req.gpu_req = gpu_req.id
                    LEFT JOIN ram AS ram_min ON games_req.ram_min = ram_min.ram_id
                    LEFT JOIN ram AS ram_req ON games_req.ram_req = ram_req.ram_id
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