class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "internal server error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    // error for duplicate entered values e.g email
    const message = `you have entered duplicate ${Object.keys(err.keyValue)}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "json web token is invalid : try again";
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = "json web token is expired : try login again";
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "CastError") {
    // required data type and entered data type are different
    const message = `invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // joining all the errors and sending them as single line
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
