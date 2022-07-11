const Joi = require('joi')
const Admin = require('../../../models/admin')

module.exports = {
    async home(req, res) {
        res.render('admin/index', {
            title: 'Home page',
            layout: '../admin/layouts/main'
        })
    },
    async editAcc(req, res) {
        res.render('admin/editAdmin', {
            layout: '../admin/layouts/main'
        })
    },
    async edit(req, res) {
        let admin = await Admin.findById(req.params.id)
        if (req.file) {
            req.query.adminImg = req.file.filename
        } else {
            req.query.adminImg = admin.adminImg
        }

        const error = registerValidation(req.query)

        if (!!error) {
            console.log(error);
            res.redirect('/api/register')
            return
        }
        let hashPassword;

        if (!req.query.password) {
            hashPassword = admin.password
        } else {
            hashPassword = bcrypt.hash(req.query.password, 10)
        }

        req.query.password = hashPassword

        await Admin.findByIdAndUpdate(req.params.id, req.query)
        res.redirect('/api/')
    },

    async logout(req, res) {
        await req.session.destroy((err) => {
            if (err) throw err
            res.redirect('/api/login')
        })
    }
}

function registerValidation(val) {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        surname: Joi.string().allow('', null),
        adminImg: Joi.string().allow('', null),
        password: Joi.string().required().allow('', null)
    })

    const result = schema.validate(val)

    return result.error
}