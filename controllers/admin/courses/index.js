const Courses = require('../../../models/courses')
const Category = require('../../../models/category')
const Delete = require('../../../utils/toDelete')
module.exports = {
    async getCourses(req, res) {
        const courses = await Courses.find()
        res.render('admin/courses', {
            title: 'Home page',
            layout: '../admin/layouts/main',
            courses,
        })
    },

    async addCourse(req, res) {
        if (req.file != undefined) {
            req.body.img = req.file.filename
        } else {
            req.body.img = ''
        }
        const category = new Courses({
            name: req.body.name,
            img: req.body.img,
            price: req.body.price,
            categoryId: req.body.categoryId
        })

        await category.save()

        res.redirect('/api/courses')
    },

    async addCoursePage(req, res) {
        const category = await Category.find()
        res.render('admin/addCourses', {
            title: 'Add courses',
            layout: '../admin/layouts/main',
            category
        })
    },

    async delCourse(req, res) {
        await Courses.findByIdAndDelete(req.params.id)
        res.redirect('/api/courses')
    },

    async updateCoursePage(req, res) {
        const category = await Category.find()
        const course = await Courses.findById(req.params.id)
        res.render('admin/editCourses', {
            title: `${course.name}`,
            course,
            category,
            layout: '../admin/layouts/main'
        })
    },
    async updateCourse(req, res) {
        const course = await Courses.findById(req.params.id)

        if (req.file != '' && req.file != null && req.file != undefined) {
            await Delete(course.img)
            req.query.img = req.file.filename
        } else {
            req.query.img = course.img
        }

        console.log(req.file);

        await Courses.findByIdAndUpdate(req.params.id, { name: req.query.name, img: req.query.img, price: req.query.price, categoryId: req.query.categoryId })

        res.redirect('/api/courses')
    },
    async filCourse(req, res) {
        const cate = await Category.findById(req.params.id)
        const id = cate._id
        const courses = await Courses.find()
        const array = []
        courses.forEach(course => {
            if (course.categoryId == id) {
                return array.push(course)
            } else {
                return
            }
        })
        res.render('admin/cCourse', {
            title: cate.name,
            array: array,
            layout: "../admin/layouts/main"
        })
    }
}