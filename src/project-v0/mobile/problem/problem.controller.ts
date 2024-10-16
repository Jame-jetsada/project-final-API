import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { createProblemDto, probDto, updateStatusDto } from './problem.dto';

@Controller('project-v0/problem')
export class ProblemController {
    constructor(private problemService: ProblemService) { }

    @Get('/get-prob-type')
    async getProbType() {
        return await this.problemService.getProbType();
    }
    @Get('/get-technical-items/:probType_id')
    async getTechnicalItems(@Param('probType_id') probType_id: number) {
        return await this.problemService.getTechnicalItems(probType_id);
    }

    @Get('/get-problem-By-site-id/:site_id')
    async getProblemBySiteId(@Param('site_id') site_id: string) {
        return await this.problemService.getProblemBySiteId(site_id);
    }

    @Post('/create-problem')
    async createProblem(@Body() data: createProblemDto){
        return await this.problemService.createProblem(data);
    }

    @Get('/get-problem-by-id/:id')
    async getProblemById(@Param('id') id: string) {
        return await this.problemService.getProblemById(id);
    }

    @Get('/get-problem-history/:site_id')
    async getProblemHistoryBySiteId(@Param('site_id') site_id: string) {
        return await this.problemService.getProblemHistoryBySiteId(site_id);
    }

    @Delete('/cancel-problem/:id')
    async deleteProblemById(@Param('id') id: string) {
        return await this.problemService.removeProblemById(id);
    }

    @Post('/update-status-close')
    async updateStatusClose(@Body() data: updateStatusDto){
        return await this.problemService.updateStatusClose(data);
    }
    //web
    @Post('/update-status-yet-received')
    async updateStatusYetReceived(@Body() data: updateStatusDto){
        return await this.problemService.updateStatusYetReceived(data);
    }

    @Post('/update-status-technician-sent')
    async updateStatusTechnicianSent(@Body() data: updateStatusDto){
        return await this.problemService.updateStatusTechnicianSent(data);
    }

    @Post('/update-status-waiting-for-equipment')
    async updateStatusWaitingForEquipment(@Body() data: updateStatusDto){
        return await this.problemService.updateStatusWaitingForEquipment(data);
    }

    @Post('/update-status-success')
    async updateStatusSuccess(@Body() data: updateStatusDto){
        return await this.problemService.updateStatusSuccess(data);
    }
    @Get('/get-problem-yet-received')
    async getProblemYetReceived() {
        return await this.problemService.getProblemYetReceived();
    }

    @Get('/get-problem-technician-sent')
    async getProblemTechnicianSent() {
        return await this.problemService.getProblemTechnicianSent();
    }

    @Get('/get-problem-waiting-for-equipment')
    async getProblemWaitingForEquipment() {
        return await this.problemService.getProblemWaitingForEquipment();
    }

    @Get('/get-problem-success')
    async getProblemSuccess() {
        return await this.problemService.getProblemSuccess();
    }

    @Get('/get-problem-close')
    async getProblemClose() {
        return await this.problemService.getProblemClose();
    }
}
