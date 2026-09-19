class Apierror extends Error {
  constructor(
    statusCode,
    messgae = "Something went wrong, please try again later",
    errors = [],
    stack = ""
  ) {
    super(messgae);
    this.statusCode = statusCode;
    this.data = null;
    this.message = messgae;
    this.success = false;
    this.errors = errors;


    if(stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
} 

export { Apierror }