import * as mongoose from 'mongoose';
export const technical_informSchema = new mongoose.Schema({
    TR_Site: Number, 
    TR_ID: Number, 
    TR_Item: Number, 
    TR_Detail: String, 
    TR_User: String, 
    TR_Date: Date, 
    TR_Time: String, 
    TR_Status: Number, 
    TR_Correct_Amt: Number, 
    TR_Correct_Date: Date, 
    TR_Correct_User: String, 
    save_date: Date, 
    TR_Correct_Time: String,
    TR_Approve_User: String,
    TR_Correct_Review: String,
    TC_Date: Date, 
   
});

export interface TechnicalInform extends Document {
    TR_Site: number, 
    TR_ID: number, 
    TR_Item: number, 
    TR_Detail: string, 
    TR_User: string, 
    TR_Date: Date, 
    TR_Time: string, 
    TR_Status: number, 
    TR_Correct_Amt: number, 
    TR_Correct_Date: Date, 
    TR_Correct_User: string, 
    save_date: Date, 
    TR_Correct_Time: string,
    TR_Approve_User: string,
    TR_Correct_Review: string,
    TC_Date: Date, 
}
