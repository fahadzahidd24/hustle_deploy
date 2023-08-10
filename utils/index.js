const { ErrorHandler } = require("./ErrorHandler");
const { upload } = require("./Upload");
const { uploadToCloudinary } = require("./cloudinary");
const { pagination } = require("./pagination");
const { pushMessage } = require("./pusher");
const { sendResponse, sendToken } = require("./sendResponse");
const { validateSignUpInput } = require("./validationUtils");
const {
  HandleImage,
  handleImageUpload,
  handleVideoUpload,
  handleAudioUpload,
  handlePdfUpload,
  handleDocumentUpload,
} = require("./cloudinaryUtils");

//
module.exports = {
  ErrorHandler,
  upload,
  pagination,
  pushMessage,
  sendResponse,
  sendToken,
  validateSignUpInput,
  uploadToCloudinary,
  HandleImage,
  handleImageUpload,
  handleVideoUpload,
  handleAudioUpload,
  handlePdfUpload,
  handleDocumentUpload,
};
