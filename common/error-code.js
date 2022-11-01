module.exports.USER_ERROR_CODE = {
  EMAIL_ALREADY_EXIST: {
    statusCode: 409,
    message: "Email already exist",
  },
  EMAIL_NOT_FOUND: {
    statusCode: 400,
    message: "Email not found",
  },
};

module.exports.AUTH_ERROR_CODE = {
  WRONG_PROVIDED_PASSWORD: {
    statusCode: 400,
    message: "Wrong provided password",
  },
};