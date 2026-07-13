"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    focus: { type: String, required: true, trim: true },
    estimatedMinutes: { type: Number, required: true, min: 10 },
    equipment: [{ type: String, trim: true }],
    instructions: [{ type: String, trim: true }],
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
const WorkoutModel = mongoose_1.models.Workout || (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = WorkoutModel;
