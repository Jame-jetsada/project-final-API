import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Problem } from 'src/model/problem';
import { TechnicalType } from 'src/model/technical_type.model';

@Injectable()
export class ProblemRepo {
    constructor(
        @InjectModel('problems') private readonly problemModel: Model<Problem>,
        @InjectModel('prob_types') private readonly probTypeModel: Model<TechnicalType>,
      ) { }

      async getProbTypeAll(){
        return this.probTypeModel.find();
      }

      async getProblemBySiteId(site_id: String){
        try{

            const rs = await this.problemModel.aggregate([
                {
                  $match: {
                    site_id: site_id,
                    prob_status: { $nin: ["สำเร็จ"] }
                  },
                },
                {
                  $project: {
                    prob_id: '$prob_id',
                    prob_name: '$prob_name',
                    prob_type: '$prob_type',
                    prob_detail: '$prob_detail',
                    prob_status: '$prob_status',
                    site_id: '$site_id',
                    site_desc: '$site_desc',
                    create_date: {
                      $dateToString: {
                          format: "%d/%m/%Y %H:%M",
                          date: "$create_date"
                      }
                  },
                    name: '$name',
                  },
                },
              ]).sort({ create_date: -1 })
              .exec();
              return rs;
        }
        catch(err){
            console.log("error Repo getProblemBySiteId");
            
        }
      }
}
