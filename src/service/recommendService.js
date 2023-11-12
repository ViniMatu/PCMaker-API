const JogoRepository = require("../repositories/jogosRepository")
const jogoRepository = new JogoRepository()

class RecommendService{
    constructor(){}

    async getRecommend(ids){
        try{
            let games = []
            for(let i=0; i<ids.length;i++)
                games.push(await jogoRepository.getGame(ids[i]))
    
            const min = this.recommend('min', games)
            const rec = this.recommend('req', games)
            
            const recommendation = {
                minimun: min,
                recommended: rec
            }
            return recommendation
        } catch (e){
            console.log("Erro ao acessar o repositório: ", e)
            throw e
        }
    }

    recommend(type, games){
        let recommendation = {
            cpu: this.getBestPiece(`cpu_${type}`, games),
            gpu: this.getBestPiece(`gpu_${type}`, games),
            ram: this.getBestPiece(`ram_${type}`, games),
        }

        return recommendation
    }

    getBestPiece(type, games) {
        const obj = { ...games }
        let benchmark = ''
        let bestPiece

        if(type === 'ram_min' || type === 'ram_req')
            benchmark = 'Benchmark_Score'
        else 
            benchmark = 'Benchmark'

        bestPiece = games[0][type]
        for(let i=1; i<games.length; i++){
            if(games[i][type][benchmark] > bestPiece[benchmark])
                bestPiece = games[i][type]
        }
        return bestPiece
    }
}

module.exports = RecommendService;