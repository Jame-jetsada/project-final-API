import { Module } from '@nestjs/common';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { ProblemRepo } from './problem.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { ProblemSchema } from 'src/model/problem';
import { TechnicalTypeSchema } from 'src/model/technical_type.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'problems', schema: ProblemSchema }]),
        MongooseModule.forFeature([{ name: 'prob_types', schema: TechnicalTypeSchema }]),
      ],
    controllers: [ProblemController],
    providers: [ProblemService, ProblemRepo],
    exports: [ProblemService],
})
export class ProblemModule {}
