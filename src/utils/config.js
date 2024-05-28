require('dotenv').config()

const dbUri = process.env.DB_URI
const coinrankingApiKey = process.env.API_KEY

module.exports = {
	dbUri,
	coinrankingApiKey,
}
