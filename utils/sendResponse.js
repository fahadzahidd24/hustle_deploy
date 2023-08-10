exports.sendResponse = (statusCode, message, res, data, token) => {
  if (data) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  } else {
    return res.status(statusCode).json({
      success: true,
      message,
    });
  }
};

exports.sendToken = (statusCode, message, res, data, token) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    token,
  });
};
