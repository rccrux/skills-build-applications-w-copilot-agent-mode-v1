import { InferSchemaType, Model, Schema, model, models } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const leaderboardSchema = new Schema(
  {
    scope: { type: String, enum: ['global', 'team'], required: true },
    period: { type: String, enum: ['weekly', 'monthly'], required: true },
    entries: { type: [leaderboardEntrySchema], default: [] },
    generatedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>;
const LeaderboardModel =
  (models.Leaderboard as Model<Leaderboard>) || model<Leaderboard>('Leaderboard', leaderboardSchema);

export default LeaderboardModel;
