const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')
const app = express()
const http = require('http').createServer(app)
const session = expressSession({
        secret: 'coding is amazing',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
    // Express App Config
app.use(express.json())
app.use(session)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const toyRoutes = require('./api/toy/toyRoutes')

// routes


app.use('/api/todo', toyRoutes)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
// app.get('/**', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })


const logger = require('./services/loggerService')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port, 15, 'popo')
})

console.log('Good to go!')