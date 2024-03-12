import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CountProductsDto } from './product.dto';

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

  @Post('/addProductByArray')
  async addProductArray(@Body() items: any[]){
    return this.productService.addProductByArray(items);
  }

  @Post('/countProduct')
  async countProduct(@Body() data: CountProductsDto){
    return this.productService.countProduct(data);
  }

  // @Post('/save-countProduct')
  // async savecountProduct(@Body() data: CountProductsDto){
  //   return this.productService.countProduct(data);
  // }


  // @Post('/receiveAllProducts')
  // async receiveAllProducts(@Body() data: AllProductsDto) {
  //   return await this.productService.receiveAllProducts(data);
  // }
}
