import { InferSchemaType, Model, Schema, model, models } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    focus: { type: String, required: true, trim: true },
    estimatedMinutes: { type: Number, required: true, min: 10 },
    equipment: [{ type: String, trim: true }],
    instructions: [{ type: String, trim: true }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;
const WorkoutModel =
  (models.Workout as Model<Workout>) || model<Workout>('Workout', workoutSchema);

export default WorkoutModel;
