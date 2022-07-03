const Joi = require('joi')
const Category = require('../../../models/category')

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