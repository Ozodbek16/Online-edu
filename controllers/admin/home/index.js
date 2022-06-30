module.exports = {
    home: async (req, res) => {
        res.render('admin/index', {
            title: 'Home page',
            layout: '../admin/layouts/main'
        })
    }
}