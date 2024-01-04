import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  message: {
    type : String,
    required: true,
  },
  fromUser: {
    type : String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  toUser: {
    type : String,
    required: true,
  }
});

export interface Message extends mongoose.Document {
  message: string;
  fromUser: string;
  createdAt: Date
  toUser: string
}