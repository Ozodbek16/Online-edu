const Joi = require('joi')
const Admin = require('../../../models/admin')
const bcrypt = require('bcrypt')

module.exports = {
    async getLogin(req, res) {
        res.render('admin/login', {
            title: 'Login page',
            layout: '../admin/layouts/auth'
        })
    },
    async login(req, res) {
        try {
            if (!req.body) {
                res.send('Login required')
                // res.redirect('/api/login')
            }

            const admin = await Admin.findOne({ username: req.body.username })

            if (!admin) {
                res.send('Username is incorrect')
                return
            }

            const areSame = await bcrypt.compare(req.body.password, admin.password)

            if (!areSame) {
                res.send('Password is incorrect')
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
        const error = loginValidation(req.body)

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

function loginValidation(val) {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        surname: Joi.string(),
        adminImg: Joi.string(),
        password: Joi.string().required()
    })

    const result = schema.validate(val)

    return result.error
}