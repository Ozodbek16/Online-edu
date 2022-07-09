const Joi = require('joi')
const Category = require('../../../models/category')
const Delete = require('../../../utils/toDelete')

module.exports = {
    async homeCategory(req, res) {
        const categories = await Category.find()
        res.render('admin/categories', {
            title: 'Categories page',
            layout: '../admin/layouts/main',
            categories
        })
    },

    async addCategory(req, res) {
        if (req.file != undefined) {
            req.body.img = req.file.filename
        } else {
            req.body.img = '' || null
        }

        const error = validateCategory(req.body)

        if (!!error) {
            res.status(400).send(error.message)
        }

        const category = new Category({
            name: req.body.name,
            img: req.body.img
        })

        await category.save()

        res.redirect('/api/category')
    },

    async getAddCategory(req, res) {
        res.render('admin/addCategory', {
            title: 'Add category',
            layout: '../admin/layouts/main'
        })
    },

    async deleteCategory(req, res) {
        const category = await Category.findById(req.params.id)
        await Delete(category.img)
        await Category.findByIdAndDelete(req.params.id)
        res.redirect('/api/category')
    },
    async updateCategory(req, res) {
        const category = await Category.findById(req.params.id)
        if (req.file != undefined) {
            req.query.img = req.file.filename
        } else {
            req.query.img = category.img
        }
        const { name, img } = req.query
        await Category.findByIdAndUpdate(req.params.id, { name: name, img: img })
        res.redirect('/api/category')
    },

    async updateCategoryPage(req, res) {
        const category = await Category.findById(req.params.id)
        res.render('admin/editCategory', {
            title: category.name,
            category,
            layout: '../admin/layouts/main'
        })
    }
}

function validateCategory(val) {
    const schema = Joi.object({
        name: Joi.string().required(),
        img: Joi.string()
    })

    const res = schema.validate(val)

    return res.error
}