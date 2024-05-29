const express = require('express')
const router = express.Router()
const {
	getAllNotification,
} = require('../controllers/notificationController.js')

router.get('/notifications', getAllNotification)

module.exports = router
