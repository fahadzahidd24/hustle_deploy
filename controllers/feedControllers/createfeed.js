const { Feed } = require("../../model");
const {
  sendResponse,
  HandleImage,
  handleVideoUpload,
  handleAudioUpload,
  handlePdfUpload,
  handleDocumentUpload,
} = require("../../utils");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

exports.createfeed = CatchAsync(async (req, res) => {
  const { _id, caption } = req.body;

  // send post into the DB
  var Data = {
    userID: _id,
    caption,
  };

  // Check if req.files exist and are not empty
  if (req.files && req.files.length > 0) {
    const cloudinaryUrls = [];

    // Loop through each file and upload it to Cloudinary
    for (const file of req.files) {
      let videoData, audioData, pdfData, documentData, postImage;

      postImage = await HandleImage(file);
      videoData = await handleVideoUpload(file);
      audioData = await handleAudioUpload(file);
      pdfData = await handlePdfUpload(file);
      documentData = await handleDocumentUpload(file);

      if (postImage) {
        cloudinaryUrls.push(postImage.url);
      }
      if (videoData) {
        cloudinaryUrls.push(videoData.url);
      }
      if (audioData) {
        cloudinaryUrls.push(audioData.url);
      }
      if (pdfData) {
        cloudinaryUrls.push(pdfData.url);
      }
      if (documentData) {
        cloudinaryUrls.push(documentData.url);
      }
    }

    // const videos = cloudinaryUrls.filter((item) => item.video);
    // const pdf = cloudinaryUrls.filter((item) => item.pdf);
    // const post_Image = cloudinaryUrls.filter((item) => item.postImages);
    Data.media = cloudinaryUrls;

    const UserPost = await Feed.create({
      userID: Data.userID,
      caption: Data.caption,
      media: Data.media,
    });
    await UserPost.save();
    sendResponse(200, "Successfully Post", res);
    return;
  }

  // if file and content is empty throw an error
  if (req.files.length <= 0 && req.body.caption.length <= 0) {
    sendResponse(408, "Can't Empty Post", res);
    return;
  }

  const UserPost = await Feed.create({
    userID: Data.userID,
    caption: Data.caption,
    media: Data.media,
  });
  await UserPost.save();
  sendResponse(200, "Successfully Post", res);
  return;
});
