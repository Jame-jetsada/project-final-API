import * as mongoose from 'mongoose';
export const item_position_plan_typeSchema = new mongoose.Schema({
    Plan_Type_ID: String, 
    Item_ID: String, 
    Item_Position: String, 
    update_date: Date, 
    update_user: String, 
});

export interface item_position_plan_type extends Document {
    Plan_Type_ID: string;
    Item_ID: string;
    Item_Position: string; 
    update_date: Date;
    update_user: string; 
}
