"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    membersCount: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
}, { timestamps: true });
const TeamModel = mongoose_1.models.Team || (0, mongoose_1.model)('Team', teamSchema);
exports.default = TeamModel;
