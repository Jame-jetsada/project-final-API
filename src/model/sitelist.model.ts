import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export const sitelistSchema = new mongoose.Schema(
  {
    site_id: String,
    site_desc: String,
    site_cat: String,
    site_cat_id: Number,
    site_status: Number,
    site_permanent_status: Number,
    site_address: String,
    site_tel: String,
    site_pharmacist_name: String,
    site_area1_emp_id: String,
    site_area2_emp_id: String,
    site_pharmacist_EmpID: String,
    area_id: String,
    site_pharmacist_CitizenID: String,
    site_latitude: Number,
    site_longitude: Number,
    location: mongoose.Schema.Types.Mixed,
    update_date: Date,
    site_open_time: String,
    site_close_time: String,
    //,calculated:Number
  },
  { versionKey: false },
);

export interface sitelist extends Document {
  site_id: String;
  site_desc: String;
  site_cat: String;
  site_cat_id: Number;
  site_status: Number;
  site_permanent_status: Number;
  site_address: String;
  site_tel: String;
  site_pharmacist_name: String;
  site_area1_emp_id: String;
  site_area2_emp_id: String;
  site_pharmacist_EmpID: String;
  area_id: String;
  site_pharmacist_CitizenID: String;
  site_latitude: Number;
  location: mongoose.Schema.Types.Mixed;
  update_date: Date;
  site_open_time: String;
  site_close_time: String;
}
