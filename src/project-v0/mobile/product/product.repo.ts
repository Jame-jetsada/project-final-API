import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/model/product.model';
import { SiteProduct } from 'src/model/site_products.model';
import { CountProduct } from 'src/model/count_productg';

@Injectable()
export class ProductRepo {
  constructor(
    @InjectModel('products') private readonly productModel: Model<Product>,
    @InjectModel('site_products') private readonly siteProductModel: Model<SiteProduct>,
    @InjectModel('count_product') private readonly CountProductModel: Model<CountProduct>,
  ) { }
  async getProduct() {
    return await this.productModel.find();
  }
  async getProductById(id: String) {
    return await this.productModel
      .aggregate([
        {
          $match: {
            Itm_BarCode: id,
          },
        },
        {
          $project: {
            Itm_id: '$Itm_id',
            Product_image: "$Product_image",
            Itm_Char: '$Itm_Char',
            Itm_Desc1: '$Itm_Desc1',
            Itm_Memo: '$Itm_Memo',
            Itm_Memo_Public: '$Itm_Memo_Public',
          },
        },
      ])
      .exec();
  }
  async createProductByArray(data: any[]): Promise<any> {
    let result: any = {};
    try {
      const products = data.map(productData => new this.siteProductModel(productData));
      const savedProducts = await Promise.all(products.map(product => product.save()));

      result.res_data = savedProducts;
    } catch (error) {
      console.log(error);
      result.error = error.message;
    }
    return result;
  }

  async getSiteProductsBySiteId(siteId: String, itemId: String) {
    try {
      const rs = await this.siteProductModel.findOne({
        site_id: siteId,
        itm_id: itemId
      }).exec();
      return rs;
    }
    catch (error) {
      console.log("Error: " + error);

    }
  }
  async createCountProduct(data: any) {
    try {
      const Data = {
        username: data.username,
        password: data.password,
        created_date: new Date(),
        item_id: data.item_id,
        item_desc1: data.item_desc1,
        firstname: data.firstname,
        lastname: data.lastname,
        site_id: data.site_id,
        site_desc: data.site_desc,
        onhand_balance_qty: data.onhand_balance_qty,
        item_qty: data.item_qty,
        is_count: true,
        count_date: new Date(),
      };
      const saveData = new this.CountProductModel(Data);
      const rsSaveModalHis = await saveData.save();
    }
    catch (error) {
      console.log("error: " + error);
    }
  }

  async getCountProductbyItemSiteid(site_id: String, item_id: String){
    try{
      const rsCountProduct = await this.CountProductModel.findOne({
        site_id: site_id,
        item_id: item_id
      }).exec();
      return rsCountProduct;
    }
    catch (error) {
      console.log("error: " + error);
      
    }
  }


}
