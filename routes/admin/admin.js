const { Router } = require('express')
const router = Router()
const admin = require('../../controllers/admin/home/index.js')
const category = require('./category')
const courses = require('./courses')

// Admin home page 
router.get('/', admin.home)

// Category
router.use('/category', category)
router.use('/courses', courses)

module.exports = router