const mongoose = require('mongoose')

const cryptocurrencySchema = new mongoose.Schema(
	{
		img: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		marketCap: {
			type: Number,
			required: true,
		},
		'24h': {
			type: Number,
			required: true,
		},
		priceChangePercent: {
			type: Number,
			required: false,
		},
		change: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Cryptocurrency', cryptocurrencySchema)
