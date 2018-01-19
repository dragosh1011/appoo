const ExtendableError = require('./ExtendableError')

module.exports = class extends ExtendableError {
  constructor () {
    super('Token is invalid or has expired', 'WRONG_TOKEN', 406)
  }
}
