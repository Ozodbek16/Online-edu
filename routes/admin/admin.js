const { Router } = require('express')
const router = Router()
const admin = require('../../controllers/admin/home/index.js')
const category = require('./category')

// Admin home page 
router.get('/', admin.home)

// Category
router.use('/category', category)

module.exports = router