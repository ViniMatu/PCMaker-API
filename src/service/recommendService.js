const JogoRepository = require("../repositories/jogosRepository")
const scrapeMercadoLivre = require("../repositories/Marketplace");
const jogoRepository = new JogoRepository()

class RecommendService{
    constructor(){}

    prepareSearchQuery(model) {
        return model;
    }

    async searchComponents(recommendation){
        try{
            for(const category in recommendation){
                if(recommendation.hasOwnProperty(category)){
                    const piece = recommendation[category];
                    //const searchQuery = `${piece.Model}`;
                    const searchQuery = this.prepareSearchQuery(piece.Model);
                    const searchResults = await scrapeMercadoLivre(searchQuery);
                    if(searchResults.length > 0){
                        piece.price = searchResults[0].price;
                        piece.link = searchResults[0].link;
                    }
                }
            }
        }catch(e){
            console.error("Erro na busca de componentes:", error);
            throw e;
        }
    }
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
            await this.searchComponents(recommendation.minimun);
            await this.searchComponents(recommendation.recommended);

            return recommendation
        } catch (e){
            console.log("Erro ao acessar o repositório: ", e)
            throw e
        }
    }

    recommend(type, games){
        try{
            let recommendation = {
                cpu: this.getBestPiece(`cpu_${type}`, games),
                gpu: this.getBestPiece(`gpu_${type}`, games),
                ram: this.getBestPiece(`ram_${type}`, games),
            }

            return recommendation
        } catch(e){
            console.log("Erro ao gerar recomendação: ", e)
            throw e
        }
    }

    getBestPiece(type, games) {
        try{
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
        } catch (e){
        console.log("Erro ao escolher a melhor peça: ", e)
        throw e
        }
    }
}

module.exports = RecommendService;