const Courses = require('../../../models/courses')
const Category = require('../../../models/category')

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
            title: course.name,
            course,
            category,
            layout: '../admin/layouts/main'
        })
    },
    async updateCourse(req, res) {
        await Courses.findByIdAndUpdate(req.params.id, { name: req.query.name, img: req.query.img, price: req.query.price, categoryId: req.query.categoryId })
        res.redirect('/api/courses')
    },
    async filCourse(req, res) {
        const category = Category.findById(req.params.categoryId)
        const courses = Courses.find({ categoryId: { $eq: category._id } })
        res.render('admin/cCourse', {
            title: category.name,
            courses,
            layout: "../admin/layouts/main"
        })
    }
}