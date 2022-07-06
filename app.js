import express from 'express'
import chalk from 'chalk'
import debug from 'debug'
import morgan from 'morgan'
import path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// Run `DEBUG=app node app.js` to only see debug messages from the 'app' scope we set here.
// Run `DEBUG=* node app.js` to see all debug messages.
const appDebug = debug('app')
const app = express()

// Middleware
app.use(morgan('tiny'))                                   // Logs traffic through app
app.use(express.static(path.join(__dirname, '/public/'))) // Serves up static files before serving endpoints

// Serve up views
app.set('views', './src/views')
app.set('view engine', 'ejs')

// App endpoints
app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to ProcGen TTRPG!', data: ['a', 'b', 'c'] })
})

// Start listening for traffic on PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  appDebug(`Listening on ${chalk.green(PORT)}`)
})
