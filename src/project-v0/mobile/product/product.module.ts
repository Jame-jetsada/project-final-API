import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepo } from './product.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from 'src/model/product.model';
import { SiteProductSchema } from 'src/model/site_products.model';
import { CountProductSchema } from 'src/model/count_product.model';
import { BdsService } from 'src/project-v0/common/util/bds.service';
import { HttpModule } from '@nestjs/axios';
import { sitelistSchema } from 'src/model/sitelist.model';
import { ItemPositionPlanTypeSchema } from 'src/model/item_position_master.model';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'products', schema: productSchema }]),
    MongooseModule.forFeature([{ name: 'site_products', schema: SiteProductSchema }]),
    MongooseModule.forFeature([{ name: 'count_product', schema: CountProductSchema }]),
    MongooseModule.forFeature([{ name: 'sitelists', schema: sitelistSchema }]),
    MongooseModule.forFeature([{ name: 'item_position_plan_types', schema: ItemPositionPlanTypeSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepo, BdsService
    ],
  exports: [ProductService],
})
export class ProductModule {}
