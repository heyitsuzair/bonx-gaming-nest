import * as cloudinary from 'cloudinary';
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const uploadFile = async (file, folder) => {
  try {
    const response = await cloudinary.v2.uploader.upload(file, {
      upload_preset: process.env.CLOUDINARY_PRESET,
      folder,
      resource_type: 'raw',
    });
    return response;
  } catch (error) {
    return error;
  }
};
