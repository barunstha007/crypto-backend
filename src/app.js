const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { fork } = require('child_process')
const cron = require('node-cron')
const watchlistRoutes = require('./routes/watchlistRoutes')
const { dbUri } = require('./utils/config')
const logger = require('./utils/logger')
const cryptoRoutes = require('./routes/cryotoRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
mongoose
	.connect(dbUri)
	.then(() => console.log('Database connected successfully'))
	.catch((err) => console.error('Database connection error:', err))

const app = express()
app.use(bodyParser.json())
app.use('/api', watchlistRoutes)
app.use('/api', cryptoRoutes)
app.use('/api', notificationRoutes)

// Fork the scraper process
const scraperProcess = fork('./src/scraperProcess.js')

// Schedule the scraper to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
	scraperProcess.send('start-scraping')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
