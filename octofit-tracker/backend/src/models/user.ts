import { InferSchemaType, Model, Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    heightCm: { type: Number, required: true, min: 100 },
    weightKg: { type: Number, required: true, min: 35 },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    goals: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;
const UserModel = (models.User as Model<User>) || model<User>('User', userSchema);

export default UserModel;
