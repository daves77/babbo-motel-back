const router = require('express').Router()
const multer = require('multer')

const {checkAuthentication} = require('../middleware')

const SpriteController = require('../controller/SpriteController')


const createRouter = (prisma) => {
  const spriteController = new SpriteController(prisma.Sprite, prisma)
  router.post("/create", [multer().single('file'), checkAuthentication], spriteController.createSprite.bind(spriteController))
  return router
}


module.exports = createRouter