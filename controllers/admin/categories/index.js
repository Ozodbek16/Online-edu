const Joi = require('joi')
const Category = require('../../../models/category')

module.exports = {
    home: async (req, res) => {
        const categories = await Category.find()
        res.render('admin/categories', {
            title: 'Categories page',
            layout: '../admin/layouts/main',
            categories
        })
    },

    add: async (req, res) => {
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

    getAddCategory: async (req, res) => {
        res.render('admin/addCategory', {
            title: 'Add category',
            layout: '../admin/layouts/main'
        })
    },
    delete: async (req, res) => {
        await Category.findByIdAndDelete(req.params.id)
        res.redirect('/')
    },
    updatePage: async (req, res) => {
        const categories = await Category.find({ _id: req.params.id }).limit(1)
        let category = categories[0]
        res.render('admin/updateCategory', {
            title: category.name,
            category,
            layout: '../admin/layouts/main'
        })
    },
    update: async (req, res) => {
        const error = validateCategory(req.query)

        if (!!error) {
            res.status(400).send(error.message)
        }

        await Category.findByIdAndUpdate(req.params.id, {
            name: req.query.name,
            img: req.query.img
        })

        res.redirect('/api/category')
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