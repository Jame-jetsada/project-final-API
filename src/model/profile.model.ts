import * as mongoose from 'mongoose';
export const profileSchema = new mongoose.Schema({
  phone_number: String,
  username: String,
  password: String,
  created_date: Date,
});

export interface Profile extends Document {
  phone_number: String;
  username: String;
  password: String;
  created_date: Date;
}
