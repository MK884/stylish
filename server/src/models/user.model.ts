import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { saltOrRounds } from '../constant';
import jwt from 'jsonwebtoken';

const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || 'usau3421090124msdQ#W';
const accessTokenExpires = process.env.ACCESS_TOKEN_EXPIRY || '1d';

const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || 'jas91nbs5d41@##$nbda';
const refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRY || '2d';

const UserSchema = new mongoose.Schema<IUser>(
  {
    userName: {type: String, required: true, unique: true, index: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    phone: { type: Number },
    lastName: { type: String },
    avatarUrl: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, saltOrRounds);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password: string) { 
  return await bcrypt.compare(password, this?.password);
};

UserSchema.methods.generateAccessToken = function () {
  try {
    const user: UserToken = {
      _id: this._id,
      email: this.email,
    };

    const token = jwt.sign(user, accessTokenSecret, {
      expiresIn: accessTokenExpires,
    });
    return token;
  } catch (error) {
    console.error('Error in Generating Access Token: ', error);
    throw error;
  }
};

UserSchema.methods.generateRefreshToken = function () {
  try {
    const token = jwt.sign({ _id: this._id }, refreshTokenSecret, {
      expiresIn: refreshTokenExpires,
    });

    return token;
  } catch (error) {
    console.error('Error in Generating Refresh Token: ', error);
    throw error;
  }
};

const User = mongoose.model<IUser>('User', UserSchema);

export { User };
