import { InferSchemaType, Model, Schema, model, models } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    membersCount: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type Team = InferSchemaType<typeof teamSchema>;
const TeamModel = (models.Team as Model<Team>) || model<Team>('Team', teamSchema);

export default TeamModel;
