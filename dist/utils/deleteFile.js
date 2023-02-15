"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const cloudinary = require("cloudinary");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const deleteFile = async (public_id) => {
    try {
        const response = await cloudinary.v2.uploader.destroy(public_id);
        return response;
    }
    catch (error) {
        return error.message;
    }
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=deleteFile.js.map