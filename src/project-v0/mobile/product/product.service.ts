import { Injectable } from '@nestjs/common';
import { ProductRepo } from './product.repo';
import { CountProductsDto, GetCountProductDto, getItemByShelfDto, GetItemDetailDto } from './product.dto';
import { BdsService } from 'src/project-v0/common/util/bds.service';
import { InspectionRoundService } from 'src/project-v0/web/inspection_round/inspection_round.service';

@Injectable()
export class ProductService {
  constructor(
    private productRepo: ProductRepo,
    private readonly bdsService: BdsService,
    private readonly inspectionRoundService: InspectionRoundService,
  ) { }

  // async getProductById(id: String, site_id: String) {
  //   let result: any = {};
  //   try {
  //     const rsProfileById = await this.productRepo.getProductById(id);
  //     if (rsProfileById.length === 0) {
  //       result.res_code = 'E101';
  //       result.res_msg = 'fail';
  //     } else {
  //       const rsCount = await this.productRepo.getCountProductbyItemSiteid(site_id, rsProfileById[0].Itm_id)
  //       if (rsCount) {
  //         result.res_code = 'E102';
  //         result.res_msg = 'again';
  //         return result;
  //       }
  //       result.res_code = '000';
  //       result.res_msg = 'success';
  //       result.data = rsProfileById;
  //     }
  //   } catch (error) {
  //     console.error("Error InspectionRoundService.getProductById:", error);
  //     return {
  //       res_code: 'E500',
  //       res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
  //     };
  //   }
  //   return result;
  // }

  async countProduct(data: CountProductsDto) {
    let result: any = {};
    try {
      const rsInspectionRound = await this.inspectionRoundService.getInspectionRound();
      if(!rsInspectionRound){
        return {
          res_code: 'E110',
          res_msg: 'ไม่อยู่ในช่วงดำเนินการนับ',
        }
      }
      const rsSite = await this.productRepo.getSiteBySiteId(data.site_id);
      if(!rsSite){
        return {
          res_code: 'E102',
          res_msg: 'ไม่มีสาขาอยู่ในระบบ',
        };
      }
      let itemList: any = [];
      let siteList: any = [];
      itemList.push(data.item_id);
      siteList.push(data.site_id);
      const rsItem = await this.productRepo.getItemMastersByItemId(data.item_id);
      if (!rsItem) {
        return {
          res_code: 'E101',
          res_msg: 'ไม่มีสินค้าตัวนี้',
        }
      }
      const rsInventory = await this.bdsService.getInventoryOnhandBalance(itemList, siteList);
      const inventoryData = JSON.parse(JSON.stringify(rsInventory));
      const filteredInventoryData = inventoryData.filter(item => item.site_id !== 9);
      

      const saveCount = {
        item_id: data.item_id,
        item_desc1: rsItem.Itm_Desc1,
        site_id: data.site_id,
        site_desc: rsSite.Site_Desc,
        onhand_balance_qty: filteredInventoryData[0].onhand_balance_qty,
        item_qty: data.item_qty,
        firstname: data.firstname,
        lastname: data.lastname,
        site_Plan_Type: rsSite.Site_Plan_Type,
        inspection_code: rsInspectionRound.inspection_code,
        difference_count: data.item_qty - filteredInventoryData[0].onhand_balance_qty,
        item_position: data.item_position,
        count_date: new Date(),
        update_date: new Date(),
      }

      await this.productRepo.createCountProduct(saveCount);
      result.res_code = '000';
      result.res_msg = 'success';
    }
    catch (error) {
      console.error("Error InspectionRoundService.countProduct:", error);
      return {
        res_code: 'E500',
        res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
      };
    }
    return result;
  }

  async getCountProduct(data: GetCountProductDto) {
    let result: any = {};
    try {
      const rsInspectionRound = await this.inspectionRoundService.getInspectionRound();
      if(!rsInspectionRound){
        return {
          res_code: 'E110',
          res_msg: 'ไม่อยู่ในช่วงดำเนินการนับ',
        }
      }
      const rsCountProduct = await this.productRepo.getCountProductAllBySiteIdAndInspectionCode(data.site_id, rsInspectionRound.inspection_code, data.filters_item_position);

      result.res_code = '000';
      result.res_msg = 'success';
      result.data = rsCountProduct;
    }
    catch (error) {
      console.error("Error InspectionRoundService.getCountProduct:", error);
      return {
        res_code: 'E500',
        res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
      };
    }
    return result;
  }

  // async deleteCountProduct(id: String) {
  //   let result: any = {};
  //   try {
  //     const deleteCountProduct = await this.productRepo.deleteCountProductByid(id);
  //     result.res_code = '000';
  //     result.res_msg = 'success';
  //   }
  //   catch (error) {
  //     console.log("Error: " + error);
  //   }
  //   return result;
  // }

  async getShelfProduct(site_id: string) {
    try {
      const rsSite = await this.productRepo.getSiteBySiteId(site_id);
      if(!rsSite){
        return {
          res_code: 'E102',
          res_msg: 'ไม่มีสาขาอยู่ในระบบ',
        };
      }
      const rsShelf = await this.productRepo.getShelfBySite(rsSite.Site_Plan_Type);
      return {
        res_code: '000',
        res_msg: 'success',
        data: rsShelf
      }
    }
    catch (error) {
      console.error("Error InspectionRoundService.getShelfProduct:", error);
      return {
        res_code: 'E500',
        res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
      };
    }
  }

  async getItemDetail(data: GetItemDetailDto) {
    try {
      const rsInspectionRound = await this.inspectionRoundService.getInspectionRound();
      if (!rsInspectionRound) {
        return {
          res_code: 'E110',
          res_msg: 'ไม่อยู่ในช่วงดำเนินการนับ',
        };
      }
  
      const rsItem = data.item_id
        ? await this.productRepo.getItemMastersByItemId(data.item_id)
        : await this.productRepo.getItemMastersByItemBarCode(data.item_barcode);
  
      if (!rsItem) {
        return {
          res_code: 'E101',
          res_msg: 'ไม่มีสินค้าตัวนี้',
        };
      }
  
      const rsSite = await this.productRepo.getSiteBySiteId(data.site_id);
      if (!rsSite) {
        return {
          res_code: 'E102',
          res_msg: 'ไม่มีสาขาอยู่ในระบบ',
        };
      }
  
      const rsPosition = await this.productRepo.getPositionByItemIdAndSitePlanType(data.item_id, rsSite.Site_Plan_Type);
      if (!rsPosition) {
        return {
          res_code: 'E103',
          res_msg: 'ไม่พบข้อมูลตำแหน่ง',
        };
      }
  
      const dataList = {
        item_id: data.item_id,
        item_image: rsItem.Product_image,
        item_name: rsItem.Itm_Desc1,
        item_position: rsPosition.Item_Position,
      };
  
      return {
        res_code: '000',
        res_msg: 'success',
        data: dataList,
      };
      
    } catch (error) {
      console.error("Error InspectionRoundService.getItemDetail:", error);
      return {
        res_code: 'E500',
        res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
      };
    }
  }

  async getItemByShelf(data: getItemByShelfDto) {
    try {
      const rsInspectionRound = await this.inspectionRoundService.getInspectionRound();
      if (!rsInspectionRound) {
        return {
          res_code: 'E110',
          res_msg: 'ไม่อยู่ในช่วงดำเนินการนับ',
        };
      }
  
      const rsSite = await this.productRepo.getSiteBySiteId(data.site_id);
      if (!rsSite) {
        return {
          res_code: 'E102',
          res_msg: 'ไม่มีสาขาอยู่ในระบบ',
        };
      }
      const rsCountProduct = await this.productRepo.getCountProductAllBySiteIdAndInspectionCode(data.site_id, rsInspectionRound.inspection_code);
      const mapCountProduct = rsCountProduct.map(item => item.item_id);
      const rsItemShelf = await this.productRepo.getPositionBySitePlanTypeItemPosition(rsSite.Site_Plan_Type, data.item_position);
      const filteredItems = rsItemShelf.filter(item => !mapCountProduct.includes(item.item_id));
      return {
        res_code: '000',
        res_msg: 'success',
        data: filteredItems,
      };
    } catch (error) {
      console.error("Error InspectionRoundService.getItemByShelf:", error);
      return {
        res_code: 'E500',
        res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
      };
    }
  }

  async getTotalCountAndCounted(site_id: string){
    try {
      const rsInspectionRound = await this.inspectionRoundService.getInspectionRound();
      if (!rsInspectionRound) {
        return {
          res_code: 'E110',
          res_msg: 'ไม่อยู่ในช่วงดำเนินการนับ',
        };
      }
      const rsSite = await this.productRepo.getSiteBySiteId(site_id);
      if(!rsSite){
        return {
          res_code: 'E102',
          res_msg: 'ไม่มีสาขาอยู่ในระบบ',
        };
      }
      const rsAllItemSite = await this.productRepo.getAllItemSite(rsSite.Site_Plan_Type);
      const rsCountProduct = await this.productRepo.getCountProductAllBySiteIdAndInspectionCode(site_id, rsInspectionRound.inspection_code);
      const rsText = {
        totalCountCounted: `${rsAllItemSite.length}/${rsCountProduct.length}`,
        round: await this.inspectionRoundService.getRound()
      }
      return {
        res_code: '000',
        res_msg: 'success',
        data: rsText
      }
    }
    catch(error){
      console.error("Error InspectionRoundService.getTotalCountAndCounted:", error);
      return {
        res_code: 'E500',
        res_msg: 'เกิดข้อผิดพลาดในการประมวลผล',
      };
    }
  }
  
  
}
