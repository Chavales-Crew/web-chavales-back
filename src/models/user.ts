import { Schema, model } from 'mongoose';

interface IUser {
  email: string;
  discordId: number;
  discordUsername: string;
  discordAvatar: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    discordId: { type: Number, required: true },
    discordUsername: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'users' },
);

const User = model<IUser>('User', userSchema);

export { IUser, User };
