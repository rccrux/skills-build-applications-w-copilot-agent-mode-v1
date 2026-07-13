"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const items = await leaderboard_1.default.find()
        .populate('entries.user')
        .populate('entries.team')
        .sort({ generatedAt: -1 })
        .lean();
    res.status(200).json({
        resource: 'leaderboard',
        items,
    });
});
exports.default = router;
