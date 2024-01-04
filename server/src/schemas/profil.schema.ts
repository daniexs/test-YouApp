// profile.schema.ts
import * as mongoose from 'mongoose';

export const ProfileSchema = new mongoose.Schema({
  name: {
    type : String,
    required: true,
  },
  gender: {
    type : String,
    required: true,
  },
  birthday: {
    type : Date,
    required: true,
  },
  horoscope: {
    type : String,
    required: true,
  },
  zodiac: {
    type : String,
    required: true,
  },
  height: {
    type : Number,
    required: true,
  },
  weight: {
    type : Number,
    required: true,
  },
  userId: {
    type : String,
    required: true,
  },
  interests: {
    type : Array,
  }
});

export interface Profile extends mongoose.Document {
  name: string;
  gender: string;
  birthday: Date;
  horoscope: string;
  zodiac: string;
  height: number;
  weight: number;
  userId: String;
  interests: string[];
}
