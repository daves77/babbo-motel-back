const {PrismaClient} = require('@prisma/client')

const createUserRouter = require('./userRouter')
const createSpriteRouter =require('./spriteRouter')

const prisma = new PrismaClient()

const bindRoutes = (app) => {
  app.use('/api/user', createUserRouter(prisma))
  app.use('/api/sprite', createSpriteRouter(prisma))
}


module.exports = bindRoutes