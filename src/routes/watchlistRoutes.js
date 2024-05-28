const express = require('express')
const router = express.Router()
const { addToWatchlist } = require('../controllers/watchlistController')

router.post('/watchlist', addToWatchlist)

module.exports = router
