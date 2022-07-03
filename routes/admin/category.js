const { Router } = require('express')
const router = Router()
const categories = require('../../controllers/admin/categories/index.js')

// Categories home page 
router.get('/', categories.homeCategory)

// Add category form
router.get('/add', categories.getAddCategory)

// Add category
router.post('/add', categories.addCategory)

module.exports = router