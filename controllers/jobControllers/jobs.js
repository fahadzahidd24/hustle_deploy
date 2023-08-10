const { Job } = require("../../model");
const { pagination, sendResponse } = require("../../utils");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

//
exports.jobs = CatchAsync(async (req, res) => {
  const { page, limit, skip } = pagination(req);
  const sideHustle_Jobs = await Job.find().skip(skip).limit(limit);
  sendResponse(200, "All sideHustle Jobs", res, sideHustle_Jobs);
});
