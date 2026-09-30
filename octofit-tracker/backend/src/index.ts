import cors from 'cors'
import express, { type ErrorRequestHandler } from 'express'
import './config/database.js'
import { apiRouter } from './routes/api.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
}

app.use(errorHandler)

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`)
})