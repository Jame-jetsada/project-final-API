import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepo } from './product.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from 'src/model/product.model';
import { SiteProductSchema } from 'src/model/site_products.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'products', schema: productSchema }]),
    MongooseModule.forFeature([{ name: 'site_products', schema: SiteProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepo],
  exports: [ProductService],
})
export class ProductModule {}
