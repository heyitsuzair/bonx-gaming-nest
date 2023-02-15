"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const cloudinary = require("cloudinary");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadFile = async (file, folder) => {
    try {
        const response = await cloudinary.v2.uploader.upload(file, {
            upload_preset: process.env.CLOUDINARY_PRESET,
            folder,
            resource_type: 'raw',
        });
        return response;
    }
    catch (error) {
        return error;
    }
};
exports.uploadFile = uploadFile;
//# sourceMappingURL=uploadFile.js.map