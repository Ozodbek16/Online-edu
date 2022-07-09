const { Router } = require('express')
const router = Router()
const courses = require('../../controllers/admin/courses/index')

router.get('/add', courses.addCoursePage)

router.get('/', courses.getCourses)

router.post('/add', courses.addCourse)

router.get('/del/:id', courses.delCourse)

router.get('/edit/:id', courses.updateCoursePage)

router.get('/update/:id', courses.updateCourse)

router.get('/find/:categoryId', courses.filCourse)

module.exports = router