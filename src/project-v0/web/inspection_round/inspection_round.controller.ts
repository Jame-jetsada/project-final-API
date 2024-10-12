import { Body, Controller, Get, Post } from '@nestjs/common';
import { InspectionRoundService } from './inspection_round.service';
import { CreateInspectionRoundDto } from './inspection_round.dto';

@Controller('project-v0/inspection-round')
export class InspectionRoundController {
    constructor(private inspectionRoundService: InspectionRoundService) {}

    @Post('/create-inspection-round')
    async createInspectionRound(@Body() data: CreateInspectionRoundDto){
        return await this.inspectionRoundService.createInspectionRound(data);
    }

    @Get('/check-inspection-round')
    async checkInspectionRound() {
        return await this.inspectionRoundService.checkInspectionRound();
  }

}
