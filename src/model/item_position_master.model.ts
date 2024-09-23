import * as mongoose from 'mongoose';
export const ItemPositionPlanTypeSchema = new mongoose.Schema({
    Item_Position_Code: String,
    Item_Position_Name: String,
    Item_Position_Desc: String,
    Item_Position_Status: Number,
    Update_User: String,
    Update_Date: Date,
    Item_Position_MemberOnly: Number,
    Item_Position_Transf_Zone: String,
});

export interface ItemPositionPlanType extends Document {
    Item_Position_Code: string,
    Item_Position_Name: string,
    Item_Position_Desc: string,
    Item_Position_Status: number,
    Update_User: string,
    Update_Date: Date,
    Item_Position_MemberOnly: number,
    Item_Position_Transf_Zone: string,
}
