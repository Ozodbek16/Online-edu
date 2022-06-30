const express = require('express')
const app = express()
const { create } = require('express-handlebars')
const path = require('path')

const adminRouter = require('./routes/admin/admin')

const hbs = create({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})

// MongoDB connect
require('./helper/db')('mongodb://localhost:27017/online-edu')

// HBS connect
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Routing
app.use('/api/', adminRouter)

const port = normalizePort(process.env.port || '5000')
app.set('port', port)

try {
    app.listen(port, () => {
        console.log(`Server listening on port: `, app.get('port'));
    })
} catch (error) {
    console.log(error);
    process.exit(0)
}

function normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }

    if (port > 0) {
        return port
    }

    return false
}