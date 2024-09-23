import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/model/product.model';
import { SiteProduct } from 'src/model/site_products.model';
import { CountProduct } from 'src/model/count_product.model';
import { sitelist } from 'src/model/sitelist.model';
import { ItemPositionPlanType } from 'src/model/item_position_master.model';

@Injectable()
export class ProductRepo {
  constructor(
    @InjectModel('products') private readonly productModel: Model<Product>,
    @InjectModel('site_products') private readonly siteProductModel: Model<SiteProduct>,
    @InjectModel('count_product') private readonly CountProductModel: Model<CountProduct>,
    @InjectModel('sitelists') private readonly siteListModel: Model<sitelist>,
    @InjectModel('item_position_plan_types') private readonly itemPositionPlanTypeModel: Model<ItemPositionPlanType>,

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
      console.log("Error: getSiteProductsBySiteId" + error);

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
        update_date: new Date(),
      };
      const saveData = new this.CountProductModel(Data);
      const rsSaveModalHis = await saveData.save();
    }
    catch (error) {
      console.log("error: createCountProduct" + error);
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
      console.log("error: getCountProductbyItemSiteid" + error);
      
    }
  }

  async getCountProductAllBySiteid(site_id: String){
    try{
      const rs = await this.CountProductModel.aggregate([
        {
          $match: {
            site_id: site_id,
          },
        },
        {
          $project: {
            item_desc1: '$item_desc1',
            item_qty: '$item_qty',
            item_id: '$item_id',
            count_date: {
              $dateToString: {
                  format: "%d/%m/%Y %H:%M",
                  date: "$count_date"
              }
          },
            name: { $concat: ['$firstname', ' ', '$lastname'] },
          },
        },
      ]).sort({ update_date: -1 })
      .exec();
      return rs;
    }
    catch(error) {
      console.log("error: getCountProductAllBySiteid" + error);
    }
  }

  async countSiteProductsBysiteId(site_id: String){
    try{
      const rs = await this.siteProductModel.find({
        site_id: site_id,
      }).exec();
      return rs.length;
    }
    catch(error) {
      console.log("error: countSiteProductsBysiteId" + error);
    }
  }

  async deleteCountProductByid(id: String){
    try{
      const rs = await this.CountProductModel.findOneAndDelete({
        _id: id,
      }).exec();
    }
    catch(error) {
      console.log("error: deleteCountProductByid" + error);
      
    }
  }

  async getSiteBySiteId(site_id: string){
    try{
      return await this.siteListModel.findOne({
        Site_ID: Number(site_id)
      }).exec();
    }
    catch(error) {
      console.log("error: getSiteBySiteId" + error);
    }
  }

  async getShelfBySite(SitePlanType: string) {
    try {
      const rs = await this.itemPositionPlanTypeModel.aggregate([
        {
          $match: {
            Plan_Type_ID: SitePlanType,
          },
        },
        {
          $group: {
            _id: "$Item_Position", 
          },
        },
        {
          $sort: {
            _id: 1, 
          },
        },
      ]).exec();
  
      const itemPositions = rs.map(item => item._id);
      return itemPositions;
    } catch (error) {
      console.log("error: getShelfBySite" + error);
    }
  }

}
