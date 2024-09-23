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
  item_id: string;
  item_desc1: string;
  site_id: string;
  site_desc: string;
  onhand_balance_qty: number;
  item_qty: number;
  is_count: boolean;
  count_date: Date;
  update_date: Date;
}
