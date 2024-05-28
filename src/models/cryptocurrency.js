const mongoose = require('mongoose')

const cryptocurrencySchema = new mongoose.Schema(
	{
		img: String,
		code: String,
		name: String,
		price: Number,
		marketCap: Number,
		'24h': Number,
		priceChangePercent: Number,
		change:Number
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Cryptocurrency', cryptocurrencySchema)
