const BaseController = require('./BaseController')
const {getPasswordHash, comparePassword} = require("../utils")


module.exports  = class UserController extends BaseController {

    async createUser(req, res) {
      const {email, password} = req.body
        const userExists = await this.model.findUnique({
          where: {
            email
          }
        })

        if (userExists){
          res.status(401).json({error: "User already exists"})
        }
        const hashedPassword = await getPasswordHash(password)
        console.log(hashedPassword)
        const user = await this.model.create({
          data: {
          email,
          password: hashedPassword 
          }
        })
    }


    async loginUser(req, res) {
      const {email, password} = req.body
      const user = await this.model.findUnique({
        where: {
          email
        }
      })
      console.log(user)
      const match = await comparePassword(password, user.password)
      if (match) {
        //send jwt

        console.log("logged in user")
      }
    }
}