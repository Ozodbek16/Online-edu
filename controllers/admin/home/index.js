module.exports = {
    async home(req, res) {
        res.render('admin/index', {
            title: 'Home page',
            layout: '../admin/layouts/main'
        })
    }
}