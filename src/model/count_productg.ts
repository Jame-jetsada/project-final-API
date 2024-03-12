import * as mongoose from 'mongoose';
export const CountProductSchema = new mongoose.Schema({
  item_id: String,
  item_desc1: String,
  firstname: String,
  lastname: String,
  site_id: String,
  site_desc: String,
  onhand_balance_qty: Number,
  item_qty: Number,
  is_count: Boolean,
  count_date: Date,
  update_date: Date,
});

export interface CountProduct extends Document {
  item_id: String;
  item_desc1: String;
  site_id: String;
  site_desc: String;
  onhand_balance_qty: Number;
  item_qty: Number;
  is_count: Boolean;
  count_date: Date;
  update_date: Date;
}
