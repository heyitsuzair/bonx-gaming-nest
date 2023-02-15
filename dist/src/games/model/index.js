"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesModel = void 0;
const mongoose = require("mongoose");
exports.GamesModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: true,
    },
    long_description: {
        type: String,
        required: true,
    },
    features: {
        type: String,
        required: true,
    },
    whats_new: {
        type: String,
    },
    installs: {
        type: String,
        required: true,
    },
    current_version: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    game_file: {
        type: {
            filename: {
                type: String,
                required: true,
            },
            size: {
                type: Number,
                required: true,
            },
        },
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
}, { timestamps: true });
//# sourceMappingURL=index.js.map