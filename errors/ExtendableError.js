module.exports = class ExtendableError extends Error {
  constructor (message, id, code, content) {
    super();
    this.message = message;
    this.id = id;
    this.content = content;
    this.code = code;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor.name);
  }
};
