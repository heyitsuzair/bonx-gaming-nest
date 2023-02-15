"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPicture = void 0;
const cloudinary = require("cloudinary");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadPicture = async (file, folder) => {
    try {
        const response = await cloudinary.v2.uploader.upload(file, {
            upload_preset: process.env.CLOUDINARY_PRESET,
            folder,
        });
        return response;
    }
    catch (error) {
        return error;
    }
};
exports.uploadPicture = uploadPicture;
//# sourceMappingURL=uploadPicture.js.map