const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const members = require('./Members')

const logger = require('./middleware/logger')

const app = express()


// Initialise middleware

// Handlebars Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Body Parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Homepage router
app.get('/', (req, res)  => res.render('index', {
    title: 'Member App',
    members
}))

// Set static folder 
// (better than setting up a route for each of the pages separetely):
app.use(express.static(path.join(__dirname, 'public')))

// Members API routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5004

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))

 