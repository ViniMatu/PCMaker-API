const express = require('express')
const gamesController = require('../controller/jogoController')
const recommendController = require('../controller/recommendController')

const router = express.Router()

router.get('/games', gamesController.getAllGames)
router.get('/games/:ids', gamesController.getGame)
router.get('/idGames/', gamesController.getIdGame)
router.get('/recommend/:ids', recommendController.getRecommend)

module.exports = router