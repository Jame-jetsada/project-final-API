import { Injectable } from '@nestjs/common';
import { ProductRepo } from './product.repo';
import { CountProductsDto } from './product.dto';
import { BdsService } from 'src/project-v0/common/util/bds.service';

@Injectable()
export class ProductService {
  constructor(
    private productRepo: ProductRepo,
    private readonly bdsService: BdsService,
  ) { }

  async getProductAll() {
    let result: any = {};
    try {
      const rsProfile = await this.productRepo.getProduct();
      result.res_code = '000';
      result.res_msg = 'success';
      result.data = rsProfile;
    } catch (error) { }
    return result;
  }

  async getProductById(id: String, site_id: String) {
    let result: any = {};
    try {
      const rsProfileById = await this.productRepo.getProductById(id);
      if (rsProfileById.length === 0) {
        result.res_code = 'E101';
        result.res_msg = 'fail';
      } else {
        const rsCount = await this.productRepo.getCountProductbyItemSiteid(site_id, rsProfileById[0].Itm_id)
        if (rsCount) {
          result.res_code = 'E102';
          result.res_msg = 'again';
          return result;  
        }
        result.res_code = '000';
        result.res_msg = 'success';
        result.data = rsProfileById;
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
          const saveCountProduct = await this.productRepo.createCountProduct(saveCount);
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

  async getCountProductAll(site_id: String){
    let result:any = {};
    try{
      const rsProductAll = await this.productRepo.getCountProductAllBySiteid(site_id);
      const countAllSite = await this.productRepo.countSiteProductsBysiteId(site_id);
      result.res_code = '000';
      result.res_msg = 'success';
      result.CountAllSite = countAllSite;
      result.CountedProduct = rsProductAll.length;
      result.data = rsProductAll;
    }
    catch(error) {
      console.log("Error: " + error);
      
    }
    return result;
  }

  async deleteCountProduct(id: String){
    let result:any = {};
    try{
      const deleteCountProduct = await this.productRepo.deleteCountProductByid(id);
      result.res_code = '000';
      result.res_msg = 'success';
    }
    catch(error) {
      console.log("Error: " + error);
    }
    return result;
  }

  async getShelfProduct(site_id: string) {
    try {
      const rsSite = await this.productRepo.getSiteBySiteId(site_id);
      const rsShelf = await this.productRepo.getShelfBySite(rsSite.Site_Plan_Type);
      return {
        res_code: '000',
        res_msg: 'success',
        data: rsShelf
      }
    }
    catch (error) {
      console.log("Error: " + error);
    }
  }
}
