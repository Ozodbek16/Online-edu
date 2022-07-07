const multer = require('multer')
const moment = require('moment')
const path = require('path')

const filePath = path.join(require.main.filename)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // file qaysi papkaga tushushi
        cb(null, filePath + '/../public/img')
    },
    filename: function (req, file, cb) {
        // file nomi // fayli hech qachon bir xil bo'masligi kerak
        const uniqueSuffix = moment().format('DD-MM-YYYY_HH-mm-ss') + '-' + file.originalname

        cb(null, uniqueSuffix)
    }
})

const allowedType = ['image/jpg', 'image/png', 'image/jpeg']

function fileFilter(req, file, cb) {
    if (allowedType.includes(file.mimetype)) {
        // file ga ruxsat bor
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage,
    fileFilter
})