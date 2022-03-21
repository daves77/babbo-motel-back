const jwt = require('jsonwebtoken')
const errorHandler = (err, req, res, next) => {
 console.log(err)
 res.status(500).send(err)
} 


const checkAuthentication = (req, res, next) => {
  try {
    const authToken = req.header("Authorization").replace("Bearer ", "")
    const userInfo = jwt.verify(authToken, process.env.SALT)
    req.userId = userInfo.id
    if (!userInfo.id){
      throw new Error({error: "No auth found"})
    }
    next()
  } catch (err){
    res.status(403).json({error: "You are not authenticated to do this action"})
  } 
}

module.exports = {
  errorHandler,
  checkAuthentication
}