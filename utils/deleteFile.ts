import * as cloudinary from 'cloudinary';
import { config } from 'dotenv';
config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const deleteFile = async (public_id) => {
  try {
    const response = await cloudinary.v2.uploader.destroy(public_id);
    return response;
  } catch (error) {
    return error.message;
  }
};
