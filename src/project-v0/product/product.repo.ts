import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/model/product.model';

@Injectable()
export class ProductRepo {
  constructor(
    @InjectModel('products') private readonly productModel: Model<Product>,
  ) {}
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
            Itm_Char: '$Itm_Char',
            Itm_Desc1: '$Itm_Desc1',
            Itm_Memo: '$Itm_Memo',
            Itm_Memo_Public: '$Itm_Memo_Public',
          },
        },
      ])
      .exec();
  }
}
