import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

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

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})