const DB = require('../database/database.js');
const db = new DB()

class JogoRepository {
  constructor() {}

  async getAllGames(){
    try{
      const query = `SELECT 
                    games_req.ID,
                    games_req.name,
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
                    LEFT JOIN CPU_Link AS cpu_min ON games_req.cpu_req = cpu_min.id
                    LEFT JOIN CPU_Link AS cpu_req ON games_req.cpu_req = cpu_req.id
                    LEFT JOIN GPU_Link AS gpu_min ON games_req.cpu_req = gpu_min.id
                    LEFT JOIN GPU_Link AS gpu_req ON games_req.cpu_req = gpu_req.id
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
    const newObj = { ...obj };
  
    // Organiza as chaves aninhadas para um novo objeto
    newObj.cpu_min = {
      Type: newObj['cpu_min.Type'],
      id: newObj['cpu_min.id'],
      Brand: newObj['cpu_min.Brand'],
      Model: newObj['cpu_min.Model'],
      Benchmark: newObj['cpu_min.Benchmark'],
      URL: newObj['cpu_min.URL'],
    };
    
    newObj.gpu_min = {
        Type: newObj['gpu_min.Type'],
        id: newObj['gpu_min.id'],
        Brand: newObj['gpu_min.Brand'],
        Model: newObj['gpu_min.Model'],
        Benchmark: newObj['gpu_min.Benchmark'],
        URL: newObj['gpu_min.URL'],
    };

    newObj.ram_min = {
        Type: newObj['ram_min.Type'],
        id: newObj['ram_min.Id'],
        Brand: newObj['ram_min.Brand'],
        Model: newObj['ram_min.Model'],
        Size: newObj['ram_req.Size'],
        Benchmark_Score: newObj['ram_min.Benchmark_score'],
        Benchmark_Link: newObj['ram_min.Benchmark_link'],
    };
    

    newObj.cpu_req = {
      Type: newObj['cpu_req.Type'],
      id: newObj['cpu_req.id'],
      Brand: newObj['cpu_req.Brand'],
      Model: newObj['cpu_req.Model'],
      Benchmark: newObj['cpu_req.Benchmark'],
      URL: newObj['cpu_req.URL'],
    };

    newObj.gpu_req = {
        Type: newObj['gpu_req.Type'],
        id: newObj['gpu_req.id'],
        Brand: newObj['gpu_req.Brand'],
        Model: newObj['gpu_req.Model'],
        Benchmark: newObj['gpu_req.Benchmark'],
        URL: newObj['gpu_req.URL'],
    };

    newObj.ram_req = {
        Type: newObj['ram_req.Type'],
        id: newObj['ram_req.Id'],
        Brand: newObj['ram_req.Brand'],
        Model: newObj['ram_req.Model'],
        Size: newObj['ram_req.Size'],
        Benchmark_Score: newObj['ram_req.Benchmark_score'],
        Benchmark_Link: newObj['ram_req.Benchmark_link'],
    };
    
    // Remove as chaves antigas
    delete newObj['cpu_min.Type'];
    delete newObj['cpu_min.id'];
    delete newObj['cpu_min.Brand'];
    delete newObj['cpu_min.Model'];
    delete newObj['cpu_min.Benchmark'];
    delete newObj['cpu_min.URL'];
    
    delete newObj['gpu_min.Type'];
    delete newObj['gpu_min.id'];
    delete newObj['gpu_min.Brand'];
    delete newObj['gpu_min.Model'];
    delete newObj['gpu_min.Benchmark'];
    delete newObj['gpu_min.URL'];
    
    delete newObj['ram_min.Type'];
    delete newObj['ram_min.Id'];
    delete newObj['ram_min.Brand'];
    delete newObj['ram_min.Model'];
    delete newObj['ram_min.Size'];
    delete newObj['ram_min.Frequency'];
    delete newObj['ram_min.Benchmark_score'];
    delete newObj['ram_min.Benchmark_link'];

    delete newObj['cpu_req.Type'];
    delete newObj['cpu_req.id'];
    delete newObj['cpu_req.Brand'];
    delete newObj['cpu_req.Model'];
    delete newObj['cpu_req.Benchmark'];
    delete newObj['cpu_req.URL'];
   
    delete newObj['gpu_req.Type'];
    delete newObj['gpu_req.id'];
    delete newObj['gpu_req.Brand'];
    delete newObj['gpu_req.Model'];
    delete newObj['gpu_req.Benchmark'];
    delete newObj['gpu_req.URL'];
  
    delete newObj['ram_req.Type'];
    delete newObj['ram_req.Id'];
    delete newObj['ram_req.Brand'];
    delete newObj['ram_req.Model'];
    delete newObj['ram_req.Size'];
    delete newObj['ram_req.Frequency'];
    delete newObj['ram_req.Benchmark_score'];
    delete newObj['ram_req.Benchmark_link'];
    
    return newObj;
  }

  async getGame(idGame) {
    try{
      const query = `SELECT 
                    games_req.ID,
                    games_req.name,
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
                    LEFT JOIN CPU_Link AS cpu_min ON games_req.cpu_req = cpu_min.id
                    LEFT JOIN CPU_Link AS cpu_req ON games_req.cpu_req = cpu_req.id
                    LEFT JOIN GPU_Link AS gpu_min ON games_req.cpu_req = gpu_min.id
                    LEFT JOIN GPU_Link AS gpu_req ON games_req.cpu_req = gpu_req.id
                    LEFT JOIN ram AS ram_min ON games_req.ram_min = ram_min.ram_id
                    LEFT JOIN ram AS ram_req ON games_req.ram_req = ram_req.ram_id
                    WHERE ${idGame} = games_req.ID;`
      const result = await db.makeQuery(query)
      const modifiedData = result.map(item => this.reorganizeObject(item));
      return modifiedData[0]
    } catch (e){
      console.log("Erro ao pegar id especifico do jogo: ", e)
      throw e
    }
  }

  async getIdGames(){
    try{
      const query = `SELECT games.id FROM games_req AS games`
      const result = await db.makeQuery(query)
      return result
    } catch (e){
      console.log("Erro ao tentar pegar os Ids dos jogos: ", e)
      throw e
    }
  }
}

module.exports = JogoRepository;