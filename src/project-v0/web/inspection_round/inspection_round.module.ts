import { Module } from '@nestjs/common';
import { InspectionRoundController } from './inspection_round.controller';
import { InspectionRoundService } from './inspection_round.service';
import { InspectionRoundRepo } from './inspection_round.repo';
import { BdsService } from 'src/project-v0/common/util/bds.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from 'src/model/product.model';
import { SiteProductSchema } from 'src/model/site_products.model';
import { CountProductSchema } from 'src/model/count_product.model';
import { sitelistSchema } from 'src/model/sitelist.model';
import { ItemPositionPlanTypeSchema } from 'src/model/item_position_master.model';
import { InspectionRoundSchema } from 'src/model/inspection_round.model';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'products', schema: productSchema }]),
    MongooseModule.forFeature([{ name: 'site_products', schema: SiteProductSchema }]),
    MongooseModule.forFeature([{ name: 'count_product', schema: CountProductSchema }]),
    MongooseModule.forFeature([{ name: 'sitelists', schema: sitelistSchema }]),
    MongooseModule.forFeature([{ name: 'item_position_plan_types', schema: ItemPositionPlanTypeSchema }]),
    MongooseModule.forFeature([{ name: 'inspection_rounds', schema: InspectionRoundSchema }]),
  ],
  controllers: [InspectionRoundController],
  providers: [InspectionRoundService, InspectionRoundRepo, BdsService]
})
export class InspectionRoundModule {}
