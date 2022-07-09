const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const moment = require('moment')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const allowedType = ['image/png', 'image/jpg', 'image/jpeg']

function fileFilter(req, file, cb) {
    if (allowedType.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

module.exports = multer(storage, fileFilter)