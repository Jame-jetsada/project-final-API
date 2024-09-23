import * as mongoose from 'mongoose';
export const technical_itemSchema = new mongoose.Schema({
    Item_ID: Number,
  Item_Desc: String,
  Item_Seq: Number,
  Item_Cancel: Number,
  Item_Type: Number,
  Item_Remark: String,
  update_date: Date,
  item_store: Number,
  item_front: Number,
});

export interface TechnicalItem extends Document {
    Item_ID: number,
  Item_Desc: string,
  Item_Seq: number,
  Item_Cancel: number,
  Item_Type: number,
  Item_Remark: string,
  update_date: Date,
  item_store: number,
  item_front: number,
}
