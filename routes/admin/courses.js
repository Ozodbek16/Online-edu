const { Router } = require('express')
const router = Router()
const courses = require('../../controllers/admin/courses/index')
const upload = require('../../middleware/file')

router.get('/add', courses.addCoursePage)

router.get('/', courses.getCourses)

router.post('/add', upload.single('img'), courses.addCourse)

router.get('/del/:id', courses.delCourse)

router.get('/edit/:id', courses.updateCoursePage)

router.get('/update/:id', upload.single('img'), courses.updateCourse)

router.get('/find/:id', courses.filCourse)

module.exports = router