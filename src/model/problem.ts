import * as mongoose from 'mongoose';
export const ProblemSchema = new mongoose.Schema({
    prob_id	: String,
    prob_name	: String,
    prob_type: Number,
    prob_type_name	: String,
    prob_item: Number,
    prob_item_name	: String,
    prob_detail	: String,
    prob_status	: String,
    prob_status_log: mongoose.Schema.Types.Mixed,
    prob_image	: mongoose.Schema.Types.Mixed,
    site_id: String,
    site_desc: String,
    create_by: String,
    update_by: String,
    create_date: Date,
    update_date: Date,
    end_date: Date,
});

export interface Problem extends Document {
    prob_id	: string;
    prob_name: string;
    prob_type: number;
    prob_type_name	: string;
    prob_item: number;
    prob_item_name	: string;
    prob_detail	: string;
    prob_status	: string;
    prob_status_log: mongoose.Schema.Types.Mixed;
    prob_image	: mongoose.Schema.Types.Mixed,
    site_id: string;
    site_desc: string;
    create_by: string;
    update_by: string;
    create_date: Date;
    update_date: Date;
    end_date: Date;
}
