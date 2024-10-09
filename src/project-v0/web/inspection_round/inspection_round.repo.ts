import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InspectionRound } from 'src/model/inspection_round.model';

@Injectable()
export class InspectionRoundRepo {
    constructor(
        @InjectModel('inspection_rounds') private readonly InspectionRoundModel: Model<InspectionRound>,
    
      ) { }

    async createInspectionRound(data: any){
        try {
            const saveData = new this.InspectionRoundModel(data);
            await saveData.save();
        }
        catch (error) {
            console.log("error: InspectionRoundRepo.createInspectionRound" + error);
        }
    }
}
