import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('project-v0/product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async getProfile() {
    return await this.productService.getProductAll();
  }

  @Get('/getProductById/:Id')
  async getProductById(@Param('Id') Id: String) {
    return await this.productService.getProductById(Id);
  }
}
