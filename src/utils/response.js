const success = (data) => {
  if (!data) this.error();
  return {
    success: true,
    result: data,
    statusCode: 200,
  };
};

const error = (errorCode = 404, message = null) => {
  return {
    success: false,
    data: null,
    error: {
      code: errorCode || 404,
      message: message || "faliure",
    },
  };
};

exports.success = success;
exports.error = error;
