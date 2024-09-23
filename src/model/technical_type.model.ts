import * as mongoose from 'mongoose';
export const TechnicalTypeSchema = new mongoose.Schema({
    Technical_Item_Type_ID: Number,
    Technical_Item_Type_Desc: String,
});

export interface TechnicalType extends Document {
    Technical_Item_Type_ID: number;
    Technical_Item_Type_Desc: string;
}
