"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const mongoose = require("mongoose");
exports.UsersModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
//# sourceMappingURL=index.js.map