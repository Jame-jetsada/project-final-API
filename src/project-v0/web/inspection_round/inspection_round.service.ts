import { Injectable } from '@nestjs/common';
import { InspectionRoundRepo } from './inspection_round.repo';
import { BdsService } from 'src/project-v0/common/util/bds.service';
import { CreateInspectionRoundDto } from './inspection_round.dto';

@Injectable()
export class InspectionRoundService {
    constructor(
        private inspectionRoundRepo: InspectionRoundRepo,
        private readonly bdsService: BdsService,
      ) { }
    
    async createInspectionRound(data: CreateInspectionRoundDto) {
        try {
            const generateInspectionCode = () => {
                const now = new Date();
                const day = String(now.getDate()).padStart(2, '0');
                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                const month = monthNames[now.getMonth()];
                const year = now.getFullYear();
                return `${day}${month}${year}`;
            };
            const saveData = {
                inspection_name: data.inspection_name,
                inspection_code: generateInspectionCode(),
                start_date: data.start_date,
                end_date: data.end_date,
                create_date: new Date(),
                update_date: new Date(),
            }
            await this.inspectionRoundRepo.createInspectionRound(saveData);
            return {
                res_code: '000',
                res_msg: 'success',
            }
        }
        catch (error) {
            console.log("Error: InspectionRoundService.createInspectionRound" + error);
        }
    }

    async getInspectionRound(){
        try {
            return await this.inspectionRoundRepo.getInspectionRound();
        }
        catch (error) {
            console.log("Error: InspectionRoundService.getInspectionRound" + error);
        }
    }

    async checkInspectionRound(){
        try {
            const rsInspectionRound = await this.inspectionRoundRepo.getInspectionRound();
            if(!rsInspectionRound){
                return {
                    res_code: 'E110',
                    res_msg: 'ไม่อยู่ในช่วงดำเนินการนับ',
                };
            }
            return {
                res_code: '000',
                res_msg: 'success',
            }
        }
        catch (error) {
            console.log("Error: InspectionRoundService.getInspectionRound" + error);
        }
    }

    async getRound() {
        try {
            const rsInspectionRound = await this.inspectionRoundRepo.getInspectionRound();
            if(!rsInspectionRound){
                return null;
            }
            const start_date = new Date(rsInspectionRound.start_date).toLocaleDateString('en-GB');
            const end_date = new Date(rsInspectionRound.end_date).toLocaleDateString('en-GB');
            const text = `${start_date} - ${end_date}`;
            return text;
        } catch (error) {
            console.log("Error: InspectionRoundService.getRound" + error);
        }
    }
    

}
