import { Injectable } from '@nestjs/common';
import { ProblemRepo } from './problem.repo';
import { probDto } from './problem.dto';

@Injectable()
export class ProblemService {
    constructor(private problemRepo: ProblemRepo) { }

    async getProbType() {
        let result: any = {};
        try {
            const rs = await this.problemRepo.getProbTypeAll();
            if (rs.length === 0) {
                result.res_code = 'E101';
                result.res_msg = 'fail';
                return result;
            }
            result.res_code = '000';
            result.res_msg = 'success';
            result.datas = rs;
        }
        catch (error) {

        }
        return result;
    }

    async getProblemBySiteId(site_id: String) {
        let result: any = {};
        try {
            const rsProblem = await this.problemRepo.getProblemBySiteId(site_id);
            if (rsProblem.length === 0) {
                result.res_code = 'E101';
                result.res_msg = 'fail';
                return result;
            }
            result.res_code = '000';
            result.res_msg = 'success';
            result.datas = rsProblem;
        }
        catch (error) {
            console.log("error server getProblemBySiteId");
        }
        return result;
    }
}
