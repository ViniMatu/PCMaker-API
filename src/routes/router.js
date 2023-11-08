const express = require('express')
const gamesController = require('../controller/jogoController')

const router = express.Router()

router.get('/games', () => {
    try{
        gamesController.getAllGames
    } catch(e){
        console.log("Erro ao acessar o controler ", e)
    }
})
router.get('/games/:id', gamesController.getGame)

module.exports = router