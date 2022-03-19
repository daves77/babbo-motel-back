const dotenv = require('dotenv')
const cookieParser =require('cookie-parser')
const cors = require('cors')
const express = require('express')
const {PrismaClient} = require('@prisma/client')

const bindRoutes = require('./routers')

const prisma = new PrismaClient()

dotenv.config()

const PORT = process.env.PORT || '3004'
const app = express()


app.use(cors({
  credentials: true,
  origin: process.FRONTEND_URL || "http://localhost:3000"
}))
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))

bindRoutes(app)

app.listen(PORT, () => console.log(`listening @ ${PORT}`))


module.exports = {
  prisma
}