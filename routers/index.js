const {PrismaClient} = require('@prisma/client')

const createUserRouter = require('./userRouter')

const prisma = new PrismaClient()

const bindRoutes = (app) => {
  app.use('/api/user', createUserRouter(prisma))
}


module.exports = bindRoutes