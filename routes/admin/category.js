const { Router } = require('express')
const router = Router()
const categories = require('../../controllers/admin/categories/index.js')
const upload = require('../../middleware/file')

// Categories home page 
router.get('/', categories.homeCategory)

// Add category form
router.get('/add', categories.getAddCategory)

// Add category
router.post('/add', upload.single('img'), categories.addCategory)

// Delete category
router.get('/del/:id', categories.deleteCategory)

router.get('/edit/:id', upload.single('img'), categories.updateCategoryPage)

router.get('/update/:id', categories.updateCategory)


module.exports = router