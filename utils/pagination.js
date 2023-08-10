exports.pagination = (req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
  };
};
