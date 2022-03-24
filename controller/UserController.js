const jwt = require('jsonwebtoken')
const BaseController = require('./BaseController')
const {getPasswordHash, comparePassword} = require("../utils")

const SALT = process.env.SALT || 'test'
module.exports  = class UserController extends BaseController {


    async getUser(req,res) {
      const user = await this.model.findUnique({
        where: {
          id: req.userId
        }, 
        include: {
          sprite: true
        }
      })
      res.status(200).send(user)
    }

    async createUser(req, res) {
      const {email, password} = req.body
        const userExists = await this.model.findUnique({
          where: {
            email
          }
        })

        if (userExists){
          res.status(401).json({error: "User already exists"})
          return
        }
        const hashedPassword = await getPasswordHash(password)
        const user = await this.model.create({
          data: {
          email,
          password: hashedPassword 
          }
        })

        const payload = {id:user.id,  email: user.email}
        const token = jwt.sign(payload, SALT, {expiresIn: "1 day"})
        res.json({token})

    }


    async loginUser(req, res) {
      const {email, password} = req.body
      const user = await this.model.findUnique({
        where: {
          email
        }
      })
      const match = await comparePassword(password, user.password)
      if (match) {
        //send jwt
        const payload = {id: user.id, email:user.email}
        const token = jwt.sign(payload, SALT, {expiresIn: '1 day'})
        res.json({token})
      } else {
        res.status(401).json({error: "Invalid login credentials"})
      }
    }

}