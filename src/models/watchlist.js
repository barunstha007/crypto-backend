const mongoose = require('mongoose')

const watchlistSchema = new mongoose.Schema(
	{
		code: { type: String, required: true },
		min_price: { type: Number, required: true },
		max_price: { type: Number, required: true },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Watchlist', watchlistSchema)
