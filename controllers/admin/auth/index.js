const Joi = require('joi')
const Admin = require('../../../models/admin')
const bcrypt = require('bcrypt')

module.exports = {
    async getLogin(req, res) {
        res.render('admin/login', {
            title: 'Login page',
            layout: '../admin/layouts/auth',
            error: req.flash('error')
        })
    },
    async login(req, res) {
        try {
            const error = loginValidation(req.body)
            if (!!error) {
                await req.flash('error', error.message)
                res.redirect('/api/login')
                return
            }

            const admin = await Admin.findOne({ username: req.body.username })

            if (!admin) {
                await req.flash('error', 'Username is not true')
                res.redirect('/api/login')
                return
            }

            const areSame = await bcrypt.compare(req.body.password, admin.password)

            if (!areSame) {
                await req.flash('error', 'Password is incorrect')
                res.redirect('/api/login')
                return
            }

            req.session.authen = true
            req.session.admin = admin
            req.session.save((err) => {
                if (err) throw err;
                res.redirect('/api')
            })
        } catch (error) {
            console.log(error);
            res.redirect('/api/login')
        }
    },

    async getRegister(req, res) {
        res.render('admin/register', {
            title: 'Register page',
            layout: '../admin/layouts/auth'
        })
    },

    async register(req, res) {
        if (req.file != undefined) {
            req.body.adminImg = req.file.filename
        }

        const error = registerValidation(req.body)

        if (!!error) {
            console.log(error);
            res.redirect('/api/register')
            return
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = hashPassword

        const admin = new Admin(req.body)
        await admin.save()
        res.redirect('/api/login')
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
        password: Joi.string().required()
    })

    const result = schema.validate(val)

    return result.error
}

function loginValidation(val) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    const result = schema.validate(val)

    return result.error
}