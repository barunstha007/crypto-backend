const Notification = require('../models/notification')

exports.getAllNotification = async (req, res) => {
	try {
		const notifications = await Notification.find()
		if (!notifications || notifications.length === 0) {
			return res.status(404).json({ error: 'No notifications found' })
		}
		res.json(notifications)
	} catch (error) {
		console.error('Error while fetching notifications:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
