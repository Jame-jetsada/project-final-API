import * as mongoose from 'mongoose';
export const InspectionRoundSchema = new mongoose.Schema({
    inspection_name: String,
    start_date: Date,
    end_date: Date,
    create_date: Date,
    update_date: Date,
});

export interface InspectionRound extends Document {
    inspection_name: string;
    start_date: Date;
    end_date: Date;
    create_date: Date;
    update_date: Date;
}
