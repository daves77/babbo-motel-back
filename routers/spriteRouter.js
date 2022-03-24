const router = require('express').Router();
const multer = require('multer');

const { checkAuthentication } = require('../middleware');

const SpriteController = require('../controller/SpriteController');

const createRouter = (prisma) => {
	const spriteController = new SpriteController(prisma.Sprite, prisma);
	router.post(
		'/create',
		[multer().array('file', 2), checkAuthentication],
		spriteController.createSprite.bind(spriteController)
	);
	router.post(
		'/update',
		[multer().array('file', 2), checkAuthentication],
		spriteController.createSprite.bind(spriteController)
	);
	return router;
};

module.exports = createRouter;
