module.exports = async (req, res, next) => {
    res.render('404', {
        title: 'Error 404',
        layout: 'layout'
    })
} 