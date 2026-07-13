"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { _id: false });
const leaderboardSchema = new mongoose_1.Schema({
    scope: { type: String, enum: ['global', 'team'], required: true },
    period: { type: String, enum: ['weekly', 'monthly'], required: true },
    entries: { type: [leaderboardEntrySchema], default: [] },
    generatedAt: { type: Date, required: true },
}, { timestamps: true });
const LeaderboardModel = mongoose_1.models.Leaderboard || (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.default = LeaderboardModel;
