const axios = require('axios')
const mongoose = require('mongoose')
const Cryptocurrency = require('./models/cryptocurrency')
const Watchlist = require('./models/watchlist')
const Notification = require('./models/notification') // Assuming you have a Notification model
const { dbUri, coinrankingApiKey } = require('./utils/config')
const logger = require('./utils/logger')

mongoose
	.connect(dbUri)
	.then(() => console.log('Scrapper Process Database connected successfully'))
	.catch((err) => console.error('Database connection error:', err))

const calculatePercentageChange = (currentPrice, previousPrice) => {
	return ((currentPrice - previousPrice) / previousPrice) * 100
}

const checkWatchlist = async (crypto) => {
	const watchlistItems = await Watchlist.find({ code: crypto.code })
	watchlistItems.forEach(async (item) => {
		const previousPrice = crypto.price / (1 + crypto.change / 100)
		const percentChange = calculatePercentageChange(
			crypto.price,
			previousPrice
		).toFixed(2)

		if (crypto.price < item.min_price || crypto.price > item.max_price) {
			const message = `${crypto.code} is on the move, The Price is ${
				crypto.change > 0 ? 'up' : 'down'
			} ${Math.abs(percentChange)}% in 24 hrs to $${crypto.price.toFixed()}`
			logger.info(message)
			// Log notification to database
			const notification = new Notification({ message })
			await notification.save()
		}
	})
}

const scrapeData = async () => {
	try {
		const response = await axios.get('https://api.coinranking.com/v2/coins', {
			headers: {
				'x-access-token': coinrankingApiKey,
			},
		})
		const coins = response.data.data.coins

		for (const coin of coins) {
			const cryptoData = {
				img: coin.iconUrl,
				name: coin.name,
				price: coin.price,
				marketCap: coin.marketCap,
				change: Number(coin.change),
				'24hVolume': coin['24hVolume'],
			}

			const crypto = await Cryptocurrency.findOneAndUpdate(
				{ code: coin.symbol },
				cryptoData,
				{ new: true, upsert: true }
			)

			await checkWatchlist(crypto)
		}
	} catch (error) {
		logger.error('Error scraping data:', error)
	}
}

// Listen for a message from the parent process to start scraping
process.on('message', (msg) => {
	if (msg === 'start-scraping') {
		scrapeData()
	}
})
