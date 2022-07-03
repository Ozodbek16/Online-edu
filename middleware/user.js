const Admin = require('../models/admin')

module.exports = async (req, res, next) => {
    if (!req.session.admin) {
        return next()
    }

    res.locals.admin = await Admin.findById(req.session.admin._id)
    next()
}