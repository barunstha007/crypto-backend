const Crypto = require('../models/cryptocurrency')

exports.getAllCrypto = async (req, res) => {
  console.log( "inside get all crypto")
  try {
		const cryptos = await Crypto.find()
		if (cryptos.length > 0) {
			res.json(cryptos)
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
