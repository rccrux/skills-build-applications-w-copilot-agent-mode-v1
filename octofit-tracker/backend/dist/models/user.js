"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    heightCm: { type: Number, required: true, min: 100 },
    weightKg: { type: Number, required: true, min: 35 },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    goals: [{ type: String, trim: true }],
}, { timestamps: true });
const UserModel = mongoose_1.models.User || (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
