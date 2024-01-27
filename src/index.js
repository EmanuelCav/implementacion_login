const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars')
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config()

const { port, secret_session } = require('./config/config');
require('./database/database')

const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "./views"));

app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: false, limit: '10mb' }))
app.use(session({
    secret: `${secret_session}`,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())


app.use(express.static(path.join(__dirname, "../public")))

app.use(require('./routes/users.routes'))
app.use(require('./routes/products.routes'))
app.use(require('./routes/carts.routes'))
app.use(require('./routes/index.routes'))

app.listen(port, () => {
    console.log("Servidor andando");
})