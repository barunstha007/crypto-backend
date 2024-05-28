const Watchlist = require('../models/watchlist')

exports.addToWatchlist = async (req, res) => {
	const { code, min_price, max_price } = req.body
	try {
		const newEntry = new Watchlist({ code, min_price, max_price })
		await newEntry.save()
		res.status(201).json(newEntry)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
