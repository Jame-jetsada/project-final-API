import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/model/product.model';
import { SiteProduct } from 'src/model/site_products.model';
import { CountProduct } from 'src/model/count_product.model';
import { sitelist } from 'src/model/sitelist.model';
import { Item_master } from 'src/model/item_master.model';
import { item_position_plan_type } from 'src/model/item_position_plan_type.modle';

@Injectable()
export class ProductRepo {
  constructor(
    @InjectModel('products') private readonly productModel: Model<Product>,
    @InjectModel('item_masters') private readonly itemMasterModel: Model<Item_master>,
    @InjectModel('count_product') private readonly CountProductModel: Model<CountProduct>,
    @InjectModel('sitelists') private readonly siteListModel: Model<sitelist>,
    @InjectModel('item_position_plan_types') private readonly itemPositionPlanTypeModel: Model<item_position_plan_type>,

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

  async createCountProduct(data: any) {
    try {
      await this.CountProductModel.updateOne(
        { 
          item_id: data.item_id,
          inspection_code: data.inspection_code
        },
        { $set: data },
        { upsert: true }
      ).exec();
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

  async getCountProductAllBySiteIdAndInspectionCode(site_id: string, inspectionCode: string, item_position?: string) {
    try {
      const matchCriteria: any = {
        site_id: site_id,
        inspection_code: inspectionCode,
      };
  
      if (item_position) {
        matchCriteria.item_position = item_position;
      }
  
      return await this.CountProductModel.aggregate([
        {
          $match: matchCriteria, 
        },
        {
          $sort: { update_date: -1 },
        },
        {
          $project: {
            item_id: '$item_id',
            item_desc1: '$item_desc1',
            update_date: {
              $dateToString: {
                format: "%d/%m/%Y %H:%M",
                date: {
                  $add: ['$update_date', 7 * 60 * 60 * 1000],
                },
              },
            },
            item_qty: '$item_qty',
            onhand_balance_qty: '$onhand_balance_qty',
            difference_count: '$difference_count',
          },
        },
      ]).exec();
    } catch (error) {
      console.log("error: getCountProductAllBySiteIdAndInspectionCode", error);
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
      console.log("error: ProductRepo.getShelfBySite" + error);
    }
  }

  async getItemMastersByItemId(itemId: string){
    try {
      return await this.itemMasterModel.findOne({Itm_ID: itemId}).lean().exec();
    }
    catch (error) {
      console.log("error: ProductRepo.getItemMastersByItemId", error);
    }
  }

  async getItemMastersByItemBarCode(item_barcode: string){
    try {
      return await this.itemMasterModel.findOne({Itm_BarCode: item_barcode}).lean().exec();
    }
    catch (error) {
      console.log("error: ProductRepo.getItemMastersByItemBarCode", error);
    }
  }

  async getProductCountByItemIdAndInspectionCode(itemId: string, inspectorCode: string){
    try {
      return await this.CountProductModel.findOne({
        item_id: itemId,

      }).lean().exec();
    }
    catch(error){
      console.log("error: ProductRepo.getProductCountByItemIdAndInspectionCode", error);
    }
  }

  async getPositionByItemIdAndSitePlanType(itemId: string, sitePlanType: string){
    try {
      return await this.itemPositionPlanTypeModel.findOne({
        Item_ID: itemId,
        Plan_Type_ID: sitePlanType
      }).lean().exec();
    }
    catch(error){
      console.log("error: ProductRepo.getPositionByItemIdAndSitePlanType", error);
    }
  }

}
