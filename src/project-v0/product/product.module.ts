import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepo } from './product.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from 'src/model/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'products', schema: productSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepo],
  exports: [ProductService],
})
export class ProductModule {}
