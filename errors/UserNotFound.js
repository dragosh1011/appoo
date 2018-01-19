const ExtendableError = require('./ExtendableError')

module.exports = class extends ExtendableError {
  constructor (email) {
    super(`User with email ${email} not found`, 'WRONG_EMAIL', 404)
  }
}
