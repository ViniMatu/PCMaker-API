const express = require('express')
const gamesController = require('../controller/jogoController')

const router = express.Router()

router.get('/games', gamesController.getAllGames)
router.get('/games/:id', gamesController.getGame)
router.get('/idGames/', gamesController.getIdGame)

module.exports = router