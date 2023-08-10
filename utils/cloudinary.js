const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dzfomaekt",
  api_key: "528212988626273",
  api_secret: "KPkkWMS2Ld5A0TJsUredNQcLkVE",
});

const uploadToCloudinary = async (filePath, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      filePath,
      {
        folder: folder,
        resource_type: "auto", // Automatically detect the resource type (image, video, etc.)
        // transformation: { bytes_limit: 1024 * 1024 }, //1MB
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  uploadToCloudinary,
};
