const ExtendableError = require('./ExtendableError')

module.exports = class extends ExtendableError {
  constructor () {
    super('Password is wrong', 'WRONG_PASSWORD', 406)
  }
}
