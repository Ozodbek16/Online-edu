const fs = require('fs')
const path = require('path')

const filePath = path.join(require.main.filename)

module.exports = async (file) => {
    const fullPath = filePath + '/../../public/img/' + file
    return new Promise((res, rej) => {
        fs.unlink(fullPath, (err) => {
            if (err) rej(err);
            res()
        })
    })
} 