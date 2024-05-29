const Notification = require('../models/notification')

exports.getAllNotification = async (req, res) => {
	try {
		const notifications = await Notification.find()
		if (notifications.length > 0) {
			res.json(notifications)
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
