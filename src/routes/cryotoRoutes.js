const express = require('express')
const router = express.Router()
const { getAllCrypto } = require('../controllers/cryptoController.js')

router.get('/cryptos', getAllCrypto)

module.exports = router
