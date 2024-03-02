import * as mongoose from 'mongoose';
export const profileSchema = new mongoose.Schema({
  phone_number: String,
  username: String,
  password: String,
  site_id: String,
  site_name: String,
  firstname: String,
  lastname: String,
  emp_id: String,
  emp_position: String,
  image: String,
  create_date: Date,
  update_date: Date,
});

export interface Profile extends Document {
  phone_number: String;
  username: String;
  password: String;
  site_id: String;
  site_name: String;
  firstname: String;
  lastname: String;
  emp_id: Number;
  emp_position: String;
  image: String;
  create_date: Date;
  update_date: Date;
}
