import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import connect from './database/conn.js'
import router from './router/route.js'
import dotEnv from 'dotenv'
import mongoose from 'mongoose'

const PORT = 3500
const app = express()

dotEnv.config()
connect()   // connect to mongoDB Atlas

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by') // less hackers know about our stack

// HTTP GET Request
app.get('/', (req, res) => {
    res.status(200).json("Hello from Home")
})

app.use('/api', router)

// Default Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

/** Start server only when we have valid connection */
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB Atlas")
    app.listen(PORT, () => console.log(`NodeJS server is running on a port: ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})
