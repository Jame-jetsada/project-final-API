import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CountProductsDto } from './product.dto';

@Controller('project-v0/product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async getProfile() {
    return await this.productService.getProductAll();
  }

  @Get('/getProductById/:Id/:site_id')
  async getProductById(@Param('Id') Id: string, @Param('site_id') site_id: string) {
    return await this.productService.getProductById(Id, site_id);
  }

  @Post('/addProductByArray')
  async addProductArray(@Body() items: any[]){
    return this.productService.addProductByArray(items);
  }

  @Post('/countProduct')
  async countProduct(@Body() data: CountProductsDto){
    return this.productService.countProduct(data);
  }

  @Get('/getCountProductAll/:site_id')
  async getCountProductAll(@Param('site_id') site_id: string) {
    return await this.productService.getCountProductAll(site_id);
  }

  @Delete('/deleteCountProduct/:id')
  async deleteCountProduct(@Param('id') id: string){
    return this.productService.deleteCountProduct(id);
  }

  @Get('/get-shelf-product/:site_id')
  async getShelfProduct(@Param('site_id') site_id: string) {
    return await this.productService.getShelfProduct(site_id);
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
