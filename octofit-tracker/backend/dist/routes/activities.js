"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const items = await activity_1.default.find()
        .populate('user')
        .populate('team')
        .sort({ performedAt: -1 })
        .lean();
    res.status(200).json({
        resource: 'activities',
        items,
    });
});
exports.default = router;
