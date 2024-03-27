import express from 'express'
import cors from 'cors'

const app = express()

const PORT = 3500

// middlewares
app.use(express.json())
app.use(cors())

// HTTP GET Request
app.get('/', (req, res) => {
    res.status(200).json("Hello from Home")
})

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}...`)
})