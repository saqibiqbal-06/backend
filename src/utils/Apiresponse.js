class Apiresponse {
  constructor(statusCode, data, message = "Request was successful", errors = []) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.errors = errors;
  }
}

export { Apiresponse };