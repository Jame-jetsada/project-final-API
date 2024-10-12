import * as mongoose from 'mongoose';
export const item_masterSchema = new mongoose.Schema({
  Itm_id: String,
  Itm_BarCode: String,
  Itm_Cat_ID: String,
  Itm_Cat_ID2: String,
  Itm_Cat_ID3: String,
  Itm_Cat_ID4: String,
  Itm_Cat_ID5: String,
  Itm_Desc1: String,
  Itm_Desc2: String,
  Itm_Tax: Number,
  Itm_Sls_Unt: String,
  Itm_Price: Number,
  Itm_Price2: Number,
  Itm_Memo: String,
  Itm_Size: String,
  Itm_Component: String,
  Itm_Method: String,
  Itm_Method2: String,
  Itm_Method3: String,
  Itm_Date: Date,
  Itm_Char: String,
  Itm_Change: Number,
  Itm_age: Number,
  Itm_Pack: Number,
  Itm_Pack_Barcode: String,
  Itm_Pack_Size: String,
  Itm_Cat_Acc: String,
  Itm_CatSub_ID: String,
  Itm_PregCat: String,
  Itm_Price_Pack: Number,
  Itm_Big_Pack: Number,
  Itm_Big_Pack_Barcode: String,
  Itm_Big_Pack_Price: Number,
  Itm_Weight: Number,
  Itm_Member_Price: Number,
  Itm_Max_Per_Slip: Number,
  Itm_Temperature: Number,
  Itm_Warning_Slip: Number,
  Itm_Buyer_Age: Number,
  Itm_Reg_No: String,
  Itm_Avoid_Light: Number,
  Itm_Sale_Pack: Number,
  Itm_Sale_Pack_Price: Number,
  Itm_Memo_Public: String,
  Product_image: mongoose.Schema.Types.Mixed,
});

export interface Item_master extends Document {
  Itm_id: string;
  Itm_BarCode: string;
  Itm_Cat_ID: string;
  Itm_Cat_ID2: string;
  Itm_Cat_ID3: string;
  Itm_Cat_ID4: string;
  Itm_Cat_ID5: string;
  Itm_Desc1: string;
  Itm_Desc2: string;
  Itm_Tax: number;
  Itm_Sls_Unt: string;
  Itm_Price: number;
  Itm_Price2: number;
  Itm_Memo: string;
  Itm_Size: string;
  Itm_Component: string;
  Itm_Method: string;
  Itm_Method2: string;
  Itm_Method3: string;
  Itm_Date: Date;
  Itm_Char: string;
  Itm_Change: number;
  Itm_age: number;
  Itm_Pack: number;
  Itm_Pack_Barcode: string;
  Itm_Pack_Size: string;
  Itm_Cat_Acc: string;
  Itm_CatSub_ID: string;
  Itm_PregCat: string;
  Itm_Price_Pack: number;
  Itm_Big_Pack: number;
  Itm_Big_Pack_Barcode: string;
  Itm_Big_Pack_Price: number;
  Itm_Weight: number;
  Itm_Member_Price: number;
  Itm_Max_Per_Slip: number;
  Itm_Temperature: number;
  Itm_Warning_Slip: number;
  Itm_Buyer_Age: number;
  Itm_Reg_No: string;
  Itm_Avoid_Light: number;
  Itm_Sale_Pack: number;
  Itm_Sale_Pack_Price: number;
  Itm_Memo_Public: string;
  Product_image: mongoose.Schema.Types.Mixed;
}
