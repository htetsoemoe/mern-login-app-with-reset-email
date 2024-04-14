import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import connect from './database/conn.js'

const app = express()

const PORT = 3500

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by') // less hackers know about our stack

// HTTP GET Request
app.get('/', (req, res) => {
    res.status(200).json("Hello from Home")
})

/** Start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log('Invalid database connection...!')
})
