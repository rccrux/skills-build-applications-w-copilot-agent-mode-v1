import { InferSchemaType, Model, Schema, model, models } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'strength', 'yoga', 'hiit'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    caloriesBurned: { type: Number, required: true, min: 20 },
    distanceKm: { type: Number, min: 0 },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type Activity = InferSchemaType<typeof activitySchema>;
const ActivityModel =
  (models.Activity as Model<Activity>) || model<Activity>('Activity', activitySchema);

export default ActivityModel;
