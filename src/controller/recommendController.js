const { request, response } = require("express")
const RecommendService = require("../service/recommendService")
const recommendService = new RecommendService()

const getRecommend = async (request, response) => {
    try{
        const { ids } = request.params
        const allIds = ids.split("&")
        const recommendation = await recommendService.getRecommend(allIds)
        return response.status(200).json(recommendation)
    } catch (e){
        console.log("Erro ao acessar o serviço de recomendação: ", e)
        throw e;
    }
}

module.exports = {
    getRecommend
}