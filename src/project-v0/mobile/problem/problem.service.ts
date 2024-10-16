import { Injectable } from '@nestjs/common';
import { ProblemRepo } from './problem.repo';
import { createProblemDto, probDto, updateStatusDto } from './problem.dto';
import { PROBLEM_CONSTANTS } from 'src/config/constants';
import moment from 'moment';

@Injectable()
export class ProblemService {
    constructor(private problemRepo: ProblemRepo) { }
//mobile
    async getProbType() {
        let result: any = {};
        try {
            const rs = await this.problemRepo.getProbTypeAll();
            if (!rs.length) {
                result.res_code = 'E101';
                result.res_msg = 'fail';
                return result;
            }
            result.res_code = '000';
            result.res_msg = 'success';
            result.data = rs;
        }
        catch (error) {
            console.error("Error ProblemService.getProbType:", error);
            return {
              res_code: 'E500',
              res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
        return result;
    }

    async getTechnicalItems(probType_id: number){
        try {
            const rsTechnicalItems = await this.problemRepo.getTechnicalItemsByProbTypeId(probType_id);
            if (!rsTechnicalItems.length) {
                return {
                    res_code: 'E101',
                    res_msg: 'fail'
                }
            }
            return {
                res_code: '000',
                res_msg: 'success',
                data: rsTechnicalItems
            }
        }
        catch (error) {
            console.error("Error ProblemService.getProbType:", error);
            return {
              res_code: 'E500',
              res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async createProblem(data: createProblemDto) {
        try {
            const rsProbType = await this.problemRepo.getProbTypeByType(data.prob_type);
            const rsTechnicalItems = await this.problemRepo.getTechnicalItemsByItemId(data.prob_item);
            const saveData = {
                prob_id: 'PROB' + Math.floor(10000000 + Math.random() * 90000000).toString(),
                prob_name: data.prob_name,
                prob_type: data.prob_type,
                prob_type_name: rsProbType.Technical_Item_Type_Desc,
                prob_item: data.prob_item,
                prob_item_name: rsTechnicalItems.Item_Desc,
                prob_detail: data.prob_detail,
                prob_status: PROBLEM_CONSTANTS.STATES.NOT_YET_RECEIVED,
                prob_status_log: [
                    {
                        prob_status: PROBLEM_CONSTANTS.STATES.NOT_YET_RECEIVED,
                        create_date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                        create_by: data.create_by
                    } 
                ],
                prob_image: data.prob_image,
                site_id: data.site_id,
                site_desc: data.site_desc,
                create_by: data.create_by,
                create_date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                update_date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            }
            await this.problemRepo.createProblem(saveData);
            return {
                res_code: '000',
                res_msg: 'success'
            }
        }
        catch(error){
            console.error("Error ProblemService.getProbType:", error);
            return {
              res_code: 'E500',
              res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async getProblemBySiteId(site_id: string) {
        let result: any = {};
        try {
            const rsProblem = await this.problemRepo.getProblemFirebaseBySiteId(site_id);
            if (!rsProblem.length) {
                result.res_code = 'E101';
                result.res_msg = 'fail';
                return result;
            }
            result.res_code = '000';
            result.res_msg = 'success';
            result.data = rsProblem;
        }
        catch (error) {
            console.error("Error ProblemService.getProblemBySiteId:", error);
            return {
              res_code: 'E500',
              res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
        return result;
    }

    async getProblemById(id: string) {
        try {
            const rsProblem = await this.problemRepo.getProblemById(id);
            if (!rsProblem) {
                return {
                    res_code: 'E101',
                    res_msg: 'fail'
                }
            }
            return {
                res_code: '000',
                res_msg: 'success',
                data: rsProblem
            }
        }
        catch (error) {
            console.error("Error ProblemService.getProblemById:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async removeProblemById(id: string) {
        try {
            const rsProblem = await this.problemRepo.getProblemById(id);
            if (rsProblem.prob_status === PROBLEM_CONSTANTS.STATES.NOT_YET_RECEIVED) {
                await this.problemRepo.removeProbById(id);
                return {
                    res_code: '000',
                    res_msg: 'success'
                }
            }
            return {
                res_code: 'E101',
                res_msg: 'fail'
            }
        }
        catch (error) {
            console.error("Error ProblemService.removeProblemById:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async updateStatusClose(data: updateStatusDto){
        try{
            const rsProblem = await this.problemRepo.getProblemById(data.id);
            if(rsProblem.prob_status === PROBLEM_CONSTANTS.STATES.SUCCESS){
                await this.problemRepo.updateStatusProb(data.id, PROBLEM_CONSTANTS.STATES.CLOSE, data.name);
                await this.problemRepo.removeProbFirebase(data.id);
                return {
                    res_code: '000',
                    res_msg: 'success'
                }
            }
            return {
                res_code: 'E101',
                res_msg: 'fail'
            }
        }
        catch (error) {
            console.error("Error ProblemService.updateStatusClose:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async getProblemHistoryBySiteId(siteId: string) {
        try {
            const rsProblemHistory = await this.problemRepo.getProblemHistoryBySiteId(siteId);
            if (!rsProblemHistory.length) {
                return {
                    res_code: 'E101',
                    res_msg: 'fail'
                }
            }
            return {
                res_code: '000',
                res_msg: 'success',
                data: rsProblemHistory
            }
        }
        catch (error) {
            console.error("Error ProblemService.getProblemHistoryBySiteId:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    //web
    async updateStatusYetReceived(data: updateStatusDto){
        try{
            await this.problemRepo.updateStatusProb(data.id, PROBLEM_CONSTANTS.STATES.YET_RECEIVED, data.name);
            return {
                res_code: '000',
                res_msg: 'success'
            }
        }
        catch(error){
            console.error("Error ProblemService.updateStatusYetReceived:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async updateStatusTechnicianSent(data: updateStatusDto){
        try{
            await this.problemRepo.updateStatusProb(data.id, PROBLEM_CONSTANTS.STATES.TECHNICIAN_SENT, data.name);
            return {
                res_code: '000',
                res_msg: 'success'
            }
        }
        catch(error){
            console.error("Error ProblemService.updateStatusTechnicianSent:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async updateStatusWaitingForEquipment(data: updateStatusDto){
        try{
            await this.problemRepo.updateStatusProb(data.id, PROBLEM_CONSTANTS.STATES.WAITING_FOR_EQUIPMENT, data.name);
            return {
                res_code: '000',
                res_msg: 'success'
            }
        }
        catch(error){
            console.error("Error ProblemService.updateStatusWaitingForEquipment:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async updateStatusSuccess(data: updateStatusDto){
        try{
            await this.problemRepo.updateStatusProb(data.id, PROBLEM_CONSTANTS.STATES.SUCCESS, data.name, new Date());
            return {
                res_code: '000',
                res_msg: 'success'
            }
        }
        catch(error){
            console.error("Error ProblemService.updateStatusSuccess:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async getProblemYetReceived() {
        try {
            const match = {
                prob_status: PROBLEM_CONSTANTS.STATES.YET_RECEIVED
            }
            const rsProblem = await this.problemRepo.getProblem(match);
            if(!rsProblem.length){
                return {
                    res_code: 'E101',
                    res_msg: 'fail'
                }
            }
            return {
                res_code: '000',
                res_msg: 'success',
                data: rsProblem
            }
        }
        catch (error) {
            console.error("Error ProblemService.getProblemYetReceived:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async getProblemTechnicianSent() {
        try {
            const match = {
                prob_status: PROBLEM_CONSTANTS.STATES.TECHNICIAN_SENT
            }
            const rsProblem = await this.problemRepo.getProblem(match);
            if(!rsProblem.length){
                return {
                    res_code: 'E101',
                    res_msg: 'fail'
                }
            }
            return {
                res_code: '000',
                res_msg: 'success',
                data: rsProblem
            }
        }
        catch (error) {
            console.error("Error ProblemService.getProblemTechnicianSent:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async getProblemWaitingForEquipment() {
        try {
            const match = {
                prob_status: PROBLEM_CONSTANTS.STATES.WAITING_FOR_EQUIPMENT
            }
            const rsProblem = await this.problemRepo.getProblem(match);
            if(!rsProblem.length){
                return {
                    res_code: 'E101',
                    res_msg: 'fail'
                }
            }
            return {
                res_code: '000',
                res_msg: 'success',
                data: rsProblem
            }
        }
        catch (error) {
            console.error("Error ProblemService.getProblemWaitingForEquipment:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async getProblemSuccess() {
        try {
            const match = {
                prob_status: PROBLEM_CONSTANTS.STATES.SUCCESS
            }
            const rsProblem = await this.problemRepo.getProblem(match);
            if(!rsProblem.length){
                return {
                    res_code: 'E101',
                    res_msg: 'fail'
                }
            }
            return {
                res_code: '000',
                res_msg: 'success',
                data: rsProblem
            }
        }
        catch (error) {
            console.error("Error ProblemService.getProblemSuccess:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }

    async getProblemClose() {
        try {
            const match = {
                prob_status: PROBLEM_CONSTANTS.STATES.CLOSE
            }
            const rsProblem = await this.problemRepo.getProblem(match);
            if(!rsProblem.length){
                return {
                    res_code: 'E101',
                    res_msg: 'fail'
                }
            }
            return {
                res_code: '000',
                res_msg: 'success',
                data: rsProblem
            }
        }
        catch (error) {
            console.error("Error ProblemService.getProblemClose:", error);
            return {
                res_code: 'E500',
                res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
            };
        }
    }



}
