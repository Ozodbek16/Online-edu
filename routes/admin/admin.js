const { Router } = require('express')
const router = Router()
const admin = require('../../controllers/admin/home/index.js')
const category = require('./category')
const courses = require('./courses')
const upload = require('../..//middleware/file')

// Admin home page 
router.get('/', admin.home)
router.get('/user/edit', admin.editAcc)
router.get('/user/update/:id', upload.single('adminImg'), admin.edit)

// Category
router.use('/category', category)
router.use('/courses', courses)

module.exports = router