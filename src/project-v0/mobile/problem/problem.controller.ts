import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { probDto } from './problem.dto';

@Controller('project-v0/problem')
export class ProblemController {
    constructor(private problemService: ProblemService) { }

    @Get('/getProbType')
    async getProbType() {
        return await this.problemService.getProbType();
    }

    @Get('/getProblemBySiteId/:site_id')
    async getProblemBySiteId(@Param('Id') Id: String, @Param('site_id') site_id: String) {
        return await this.problemService.getProblemBySiteId(site_id);
    }

}
