import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CountProductsDto, GetCountProductDto, getItemByShelfDto, GetItemDetailDto } from './product.dto';

@Controller('project-v0/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // @Get('/getProductById/:Id/:site_id')
  // async getProductById(@Param('Id') Id: string, @Param('site_id') site_id: string) {
  //   return await this.productService.getProductById(Id, site_id);
  // }

  @Get('/get-item-by-shelf')
  async getItemByShelf(@Query() query: getItemByShelfDto) {
    return await this.productService.getItemByShelf(query);
  }

  @Post('/count-product')
  async countProduct(@Body() data: CountProductsDto){
    return this.productService.countProduct(data);
  }

  @Get('/get-count-product')
  async getCountProductAll(@Query() query: GetCountProductDto) {
    return await this.productService.getCountProduct(query);
  }

  @Get('/get-total-count-and-counted/:site_id')
  async getTotalCountAndCounted(@Param('site_id') site_id: string) {
    return await this.productService.getTotalCountAndCounted(site_id);
  }


  // @Delete('/deleteCountProduct/:id')
  // async deleteCountProduct(@Param('id') id: string){
  //   return this.productService.deleteCountProduct(id);
  // }

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

  @Post('/get-item-detail')
  async getItemDetail(@Body() data: GetItemDetailDto){
    return this.productService.getItemDetail(data);
  }

}
