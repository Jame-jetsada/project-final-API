import * as mongoose from 'mongoose';
export const CountProductSchema = new mongoose.Schema({
  item_id: String,
  item_desc1: String,
  firstname: String,
  lastname: String,
  site_id: String,
  site_desc: String,
  site_Plan_Type: String,
  onhand_balance_qty: Number,
  item_qty: Number,
  inspection_code: String,
  difference_count: Number,
  item_position: String,
  count_date: Date,
  update_date: Date,
});

export interface CountProduct extends Document {
  item_id: string;
  item_desc1: string;
  firstname: string;
  lastname: string;
  site_id: string;
  site_desc: string;
  site_Plan_Type: string;
  onhand_balance_qty: number;
  item_qty: number;
  inspection_code: string;
  difference_count: number;
  item_position: string;
  count_date: Date;
  update_date: Date;
}
