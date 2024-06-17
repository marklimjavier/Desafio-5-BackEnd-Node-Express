import express from 'express'
import cors from 'cors'

import { serverLog } from './middlewares/serverLog.middleware.js'
import { inventarioRouter, errors } from './routers/index.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.use(serverLog)
app.use(inventarioRouter)
app.use(errors)

app.listen(PORT, () =>
  console.log(`Server UP on http://localhost:${PORT}`)
)

export default app
