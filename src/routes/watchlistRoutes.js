const express = require('express')
const router = express.Router()
const {
	addToWatchlist,
	getAllWatchList,
} = require('../controllers/watchlistController')

router.post('/watchlist', addToWatchlist)
router.get('/watchlist', getAllWatchList)

module.exports = router
