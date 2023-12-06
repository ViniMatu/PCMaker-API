const JogoRepository = require("../repositories/jogosRepository")
const scrapeMarketPlace = require("../Marketplace/apiMarketPlace")
const RecommendRepository = require("../repositories/recommendRepository")
const jogoRepository = new JogoRepository()
const recommendRepository = new RecommendRepository()

class RecommendService{
    constructor(){}

    prepareComponentObject(value, category) {
        if (category === 'ram') {
            return { size: value };
        } else if (category === 'fonte') {
            return { power: value };
        }
    }
    prepareSearchQuery(piece, category) {
        if (category === 'ram') {
            return `memória ram ${piece.size}`;
        }else if(category === 'fonte'){
            return `fonte ${piece.power}`;
        }else{
            return piece.Model;
        }
    }

    async searchComponents(recommendation){
        try{
            for(const category in recommendation){
                if(recommendation.hasOwnProperty(category)){
                    let piece = recommendation[category];
                    if ((category === 'ram' || category === 'fonte') || (category === 'Motherboard') && typeof piece === 'number') {
                        piece = this.prepareComponentObject(piece, category);
                        recommendation[category] = piece;
                    }
                    const searchQuery = this.prepareSearchQuery(piece, category);
                    const searchResults = await scrapeMarketPlace.scrapeMercadoLivre(searchQuery);
                    if(searchResults.length > 0){
                        piece.price = searchResults[0].price;
                        piece.link = searchResults[0].link;
                        piece.imgage = searchResults[0].image;
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
            await this.getPowerSource(recommendation)

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

    async getPowerSource(recommend){
        try{
            let powerSource
            const cpuModel = recommend['gpu']['Model']
            if(cpuModel.includes("i3") || cpuModel.includes("Rayzen 3"))
                powerSource = 450
            else if(cpuModel.includes("i5") || cpuModel.includes("Rayzen 5"))
                powerSource = 550
            else 
                powerSource = 650

            const gpuModel = recommend[`cpu`][`Model`]
            if(recommend[`cpu`][`Brand`] === "Intel"){
                if(gpuModel.includes("RTX 40"))
                    powerSource += 150
                else
                    powerSource += 100
            } else if(recommend[`cpu`][`Brand`] === "AMD"){
                if(gpuModel.includes("RX 7000"))
                    powerSource += 200
                else 
                    powerSource += 100
            }

            let Powersuplie = {
                Type: "fonte",
                Powersuplie: powerSource
            }

            recommend.Powersuplie = Powersuplie
        } catch (e){
            console.log("Erro ao escolher Power Source")
        }
    }
}

module.exports = RecommendService;