exports.CatchAsync = (funAsAProp) => async (req, res, next) => {
  try {
    await funAsAProp(req, res, next);
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";

    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
