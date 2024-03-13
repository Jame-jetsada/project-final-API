import { Injectable } from '@nestjs/common';
import { ProductRepo } from './product.repo';
import { CountProductsDto } from './product.dto';

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
        result.res_msg = 'fail';
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

  async countProduct(data: CountProductsDto) {
    let result: any = {};
    try {
      const getSiteProducts = await this.productRepo.getSiteProductsBySiteId(data.site_id, data.item_id);
      const rsCount = await this.productRepo.getCountProductbyItemSiteid(data.site_id, data.item_id)
      
      if (!getSiteProducts) {
        result.res_code = 'E101';
        result.res_msg = 'fail';
      }
      else {
        const saveCount = {
          item_id: data.item_id,
          item_desc1: getSiteProducts.itm_desc1,
          site_id: getSiteProducts.site_id,
          site_desc: getSiteProducts.site_desc,
          onhand_balance_qty: getSiteProducts.onhand_balance_qty,
          item_qty: data.item_qty,
          firstname: data.firstname,
          lastname: data.lastname,
        }
        if (rsCount) {
          result.res_code = 'E102';
          result.res_msg = 'again';
        }
        else {
          const savecountProduct = await this.productRepo.createCountProduct(saveCount);
          result.res_code = '000';
          result.res_msg = 'success';
        }
      }
    }
    catch (error) {
      console.log('error');
    }
    return result;
  }
}
