const JogoRepository = require("../repositories/jogosRepository")
const scrapeMarketPlace = require("../Marketplace/apiMarketPlace")
const RecommendRepository = require("../repositories/recommendRepository")
const jogoRepository = new JogoRepository()
const recommendRepository = new RecommendRepository()

class RecommendService{
    constructor(){}

    prepareSearchQuery(model) {
        return model;
    }

    async searchComponents(recommendation){
        try{
            for(const category in recommendation){
                if(recommendation.hasOwnProperty(category) && category != 'ram' ){
                    const piece = recommendation[category];
                    //const searchQuery = `${piece.Model}`;
                    const searchQuery = this.prepareSearchQuery(piece.Model);
                    const searchResults = await scrapeMarketPlace.scrapeMercadoLivre(searchQuery);
                    if(searchResults.length > 0){
                        piece.price = searchResults[0].price;
                        piece.link = searchResults[0].link;
                    }
                }
            }
        }catch(e){
            console.error("Erro na busca de componentes:", e);
            throw e;
        }
    }

    async getRecommend(ids){
        try{
            let games = []
            for(let i=0; i<ids.length;i++)
                games.push(await jogoRepository.getGame(ids[i]))
    
            const min = await this.recommend('min', games)
            const rec = await this.recommend('req', games)
            
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

    async recommend(typeReq, games){
        try{
            let recommendation = {
                cpu: this.getBestPiece(`cpu_${typeReq}`, games),
                gpu: this.getBestPiece(`gpu_${typeReq}`, games),
                ram: this.getBestPiece(`ram_${typeReq}`, games),
            }

            await this.getMotherboard(recommendation, typeReq)

            return recommendation
        } catch(e){
            console.log("Erro ao gerar recomendação: ", e)
            throw e
        }
    }

    getBestPiece(type, games) {
        try{
            let benchmark = 'Benchmark_Score'
            let bestPiece

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

    async getMotherboard(recommend, typeReq){
        try{
            let req = typeReq === "min" ? 0 : 1
            if(recommend['cpu']['Brand'] === 'AMD'){
                let boards = await recommendRepository.getAmd(recommend['cpu']['Model'])
                let keys =  Object.keys(boards)
                let motherBoard = {
                    infos: boards[keys[req]],
                    Model: keys[req],
                    Type: "MotherBoard"
                }
                recommend.Motherboard = motherBoard 
            }
            else if(recommend['cpu']['Brand'] === 'Intel'){
                let boards = await recommendRepository.getIntel(recommend['cpu']['Model'])
                let keys =  Object.keys(boards)
                let motherBoard = {
                    Infos: boards[keys[req]],
                    Model: keys[req],
                    Type: "MotherBoard"
                }
                recommend.Motherboard = motherBoard
            }
        } catch(e){
            console.log("Erro ao escolher a placa-mãe: ", e)
            throw e
        }

    }
}

module.exports = RecommendService;