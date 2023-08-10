const { Job } = require("../../model");
const { sendResponse } = require("../../utils");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

//
exports.createJobs = CatchAsync(async (req, res) => {
  const sideHustle_Jobs = await Job.create(req.body);
  await sideHustle_Jobs.save();
  sendResponse(200, "sideHustle Jobs created", res);
});
