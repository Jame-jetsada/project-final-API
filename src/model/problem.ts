import * as mongoose from 'mongoose';
export const ProblemSchema = new mongoose.Schema({
    prob_id	: String,
    prob_name: String,
    prob_detail	: String,
    prob_type: String,
    prob_status	: String,
    site_id: String,
    site_desc: String,
    name: String,
    create_date: Date,
    end_date: Date,
});

export interface Problem extends Document {
    prob_id	: String;
    prob_name: String;
    prob_detail	: String;
    prob_type: String;
    prob_status	: String;
    site_id: String;
    site_desc: String;
    name: String;
    create_date: Date;
    end_date: Date;
}
