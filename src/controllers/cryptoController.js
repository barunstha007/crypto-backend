const Crypto = require('../models/cryptocurrency')

exports.getAllCrypto = async (req, res) => {
	try {
		const cryptos = await Crypto.find()
		if (!cryptos || cryptos.length === 0) {
			return res.status(404).json({ error: 'No cryptocurrencies found' })
		}
		res.json(cryptos)
	} catch (error) {
		console.error('Error while fetching cryptocurrencies:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
