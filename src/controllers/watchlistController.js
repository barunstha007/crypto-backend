const Watchlist = require('../models/watchlist')

exports.addToWatchlist = async (req, res) => {
	const { code, min_price, max_price } = req.body

	try {
		if (!code || !min_price || !max_price) {
			return res
				.status(400)
				.json({ error: 'Please provide code, min_price, and max_price' })
		}

		// Check if min_price is less than max_price
		if (min_price >= max_price) {
			return res
				.status(400)
				.json({ error: 'min_price must be less than max_price' })
		}

		// Create a new watchlist entry
		const newEntry = new Watchlist({ code, min_price, max_price })
		await newEntry.save()
		res.status(201).json(newEntry)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.getAllWatchList = async (req, res) => {
	try {
		const watchlist = await Watchlist.find()
		res.json(watchlist)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
