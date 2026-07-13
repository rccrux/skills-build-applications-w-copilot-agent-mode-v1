"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const team_1 = __importDefault(require("../models/team"));
const user_1 = __importDefault(require("../models/user"));
const workout_1 = __importDefault(require("../models/workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            activity_1.default.deleteMany({}),
            leaderboard_1.default.deleteMany({}),
            workout_1.default.deleteMany({}),
            user_1.default.deleteMany({}),
            team_1.default.deleteMany({}),
        ]);
        const teams = await team_1.default.insertMany([
            {
                name: 'Summit Sprinters',
                city: 'Denver',
                motto: 'Every rep earns altitude.',
                membersCount: 3,
                totalPoints: 430,
            },
            {
                name: 'Lakefront Lifters',
                city: 'Chicago',
                motto: 'Strength with consistency.',
                membersCount: 2,
                totalPoints: 345,
            },
        ]);
        const [summitSprinters, lakefrontLifters] = teams;
        const users = await user_1.default.insertMany([
            {
                name: 'Maya Patel',
                email: 'maya.patel@octofit.test',
                age: 29,
                heightCm: 167,
                weightKg: 61,
                team: summitSprinters._id,
                goals: ['Run a 10K under 52 minutes', 'Improve weekly mobility'],
            },
            {
                name: 'Jordan Kim',
                email: 'jordan.kim@octofit.test',
                age: 34,
                heightCm: 181,
                weightKg: 78,
                team: summitSprinters._id,
                goals: ['Complete 4 strength sessions per week', 'Lower resting heart rate'],
            },
            {
                name: 'Avery Brooks',
                email: 'avery.brooks@octofit.test',
                age: 26,
                heightCm: 173,
                weightKg: 69,
                team: summitSprinters._id,
                goals: ['Increase cycling endurance', 'Improve sleep consistency'],
            },
            {
                name: 'Noah Rivera',
                email: 'noah.rivera@octofit.test',
                age: 31,
                heightCm: 176,
                weightKg: 74,
                team: lakefrontLifters._id,
                goals: ['Hit a 140kg deadlift', 'Average 9k daily steps'],
            },
            {
                name: 'Emma Chen',
                email: 'emma.chen@octofit.test',
                age: 28,
                heightCm: 164,
                weightKg: 58,
                team: lakefrontLifters._id,
                goals: ['Swim 2km non-stop', 'Reduce 5K split time'],
            },
        ]);
        const [maya, jordan, avery, noah, emma] = users;
        await activity_1.default.insertMany([
            {
                user: maya._id,
                team: summitSprinters._id,
                type: 'run',
                durationMinutes: 42,
                caloriesBurned: 415,
                distanceKm: 8.1,
                performedAt: new Date('2026-07-10T06:45:00Z'),
            },
            {
                user: jordan._id,
                team: summitSprinters._id,
                type: 'strength',
                durationMinutes: 55,
                caloriesBurned: 510,
                distanceKm: 0,
                performedAt: new Date('2026-07-10T18:10:00Z'),
            },
            {
                user: avery._id,
                team: summitSprinters._id,
                type: 'cycle',
                durationMinutes: 60,
                caloriesBurned: 560,
                distanceKm: 24.5,
                performedAt: new Date('2026-07-09T12:00:00Z'),
            },
            {
                user: noah._id,
                team: lakefrontLifters._id,
                type: 'hiit',
                durationMinutes: 32,
                caloriesBurned: 390,
                distanceKm: 0,
                performedAt: new Date('2026-07-10T07:20:00Z'),
            },
            {
                user: emma._id,
                team: lakefrontLifters._id,
                type: 'swim',
                durationMinutes: 48,
                caloriesBurned: 445,
                distanceKm: 1.9,
                performedAt: new Date('2026-07-08T17:40:00Z'),
            },
        ]);
        await workout_1.default.insertMany([
            {
                title: 'Tempo Run Builder',
                level: 'intermediate',
                focus: 'Cardio endurance',
                estimatedMinutes: 45,
                equipment: ['Running shoes', 'Heart-rate monitor'],
                instructions: [
                    'Warm up with a 10-minute easy jog.',
                    'Run 3 x 8-minute tempo intervals with 2-minute easy recovery.',
                    'Cool down for 5 minutes and stretch hips/calves.',
                ],
                createdBy: maya._id,
            },
            {
                title: 'Upper Body Strength Circuit',
                level: 'advanced',
                focus: 'Strength',
                estimatedMinutes: 50,
                equipment: ['Dumbbells', 'Pull-up bar', 'Bench'],
                instructions: [
                    'Complete 4 rounds of push press, pull-ups, and bent-over rows.',
                    'Rest 90 seconds between rounds.',
                    'Finish with plank shoulder taps for core stability.',
                ],
                createdBy: jordan._id,
            },
            {
                title: 'Mobility Reset Flow',
                level: 'beginner',
                focus: 'Recovery and flexibility',
                estimatedMinutes: 25,
                equipment: ['Yoga mat'],
                instructions: [
                    'Perform cat-cow and thoracic rotations for 5 minutes.',
                    'Cycle through hip flexor and hamstring stretches.',
                    'End with diaphragmatic breathing for 3 minutes.',
                ],
                createdBy: emma._id,
            },
        ]);
        await leaderboard_1.default.insertMany([
            {
                scope: 'global',
                period: 'weekly',
                generatedAt: new Date('2026-07-11T00:00:00Z'),
                entries: [
                    { user: jordan._id, team: summitSprinters._id, points: 150, rank: 1 },
                    { user: maya._id, team: summitSprinters._id, points: 138, rank: 2 },
                    { user: noah._id, team: lakefrontLifters._id, points: 130, rank: 3 },
                    { user: avery._id, team: summitSprinters._id, points: 125, rank: 4 },
                    { user: emma._id, team: lakefrontLifters._id, points: 118, rank: 5 },
                ],
            },
            {
                scope: 'team',
                period: 'monthly',
                generatedAt: new Date('2026-07-11T00:00:00Z'),
                entries: [
                    { user: maya._id, team: summitSprinters._id, points: 420, rank: 1 },
                    { user: jordan._id, team: summitSprinters._id, points: 405, rank: 2 },
                    { user: noah._id, team: lakefrontLifters._id, points: 381, rank: 3 },
                    { user: emma._id, team: lakefrontLifters._id, points: 360, rank: 4 },
                ],
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
