const router = require('express').Router()
const UserController = require('../controller/UserController')
const {checkAuthentication} = require("../middleware")


const createRouter = (prisma) => {
const controller = new UserController(prisma.User, prisma)
router.get("/info", checkAuthentication, controller.getUser.bind(controller))
router.post("/signup", controller.createUser.bind(controller))
router.post("/login", controller.loginUser.bind(controller))
return router
}


module.exports = createRouter