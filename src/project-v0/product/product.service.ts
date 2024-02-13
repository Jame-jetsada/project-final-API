import { Injectable } from '@nestjs/common';
import { ProductRepo } from './product.repo';

@Injectable()
export class ProductService {
  constructor(private productRepo: ProductRepo) { }

  async getProductAll() {
    let result: any = {};
    try {
      const rsProfile = await this.productRepo.getProduct();
      result.res_code = '000';
      result.res_msg = 'success';
      result.datas = rsProfile;
    } catch (error) { }
    return result;
  }

  async getProductById(id: String) {
    let result: any = {};
    try {
      const rsProfileById = await this.productRepo.getProductById(id);

      if (rsProfileById.length === 0) {
        result.res_code = 'E101';
        result.res_msg = 'file';
      } else {
        result.res_code = '000';
        result.res_msg = 'success';
        result.datas = rsProfileById;
      }
    } catch (error) {
      console.log('error');
    }
    return result;
  }

  async addProductByArray(data: any[]) {
    let result: any = {};
    try {
      const saveProduct = await this.productRepo.createProductByArray(data);
      result.res_code = '000';
      result.res_msg = 'success';

    }
    catch (error) {
      console.log('error');
    }
    return result;
  }
}
