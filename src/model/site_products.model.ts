import * as mongoose from 'mongoose';
export const SiteProductSchema = new mongoose.Schema({
  itm_id: String,
  itm_BarCode: String,
  itm_desc1: String,
  site_id: String,
  site_desc: String,
  site_tel: String,
  site_latitude: Number,
  site_longitude: Number,
  last_update_datetime: Date,
  onhand_balance_qty: Number,
  itm_count: Number,
  is_count: String,
  create_date: Date,
  update_date: Date,
});

export interface SiteProduct extends Document {
  itm_id: String;
  itm_BarCode: String;
  itm_desc1: String;
  site_id: String;
  site_desc: String;
  site_tel: String;
  site_latitude: Number;
  site_longitude: Number;
  last_update_datetime: Date;
  onhand_balance_qty: Number;
  itm_count: Number;
  is_count: String;
  create_date: Date;
  update_date: Date;
}

