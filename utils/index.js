
const bcrypt = require('bcrypt')

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10

const getPasswordHash =  async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  return hashedPassword
}


const comparePassword = async (password, hashedPassword) => {
  console.log(password, hashedPassword)
  const match = await bcrypt.compare(password, hashedPassword )
  return match
}


module.exports = {
  getPasswordHash,
  comparePassword
}