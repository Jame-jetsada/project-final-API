import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Problem } from 'src/model/problem';
import { TechnicalType } from 'src/model/technical_type.model';
import firestore from 'src/firebase/init.firestore';
import { TechnicalItem } from 'src/model/technical_item.model';
import { FIREBASE_CONSTANTS, PROBLEM_CONSTANTS } from 'src/config/constants';
import { deleteDoc, doc, orderBy, setDoc, updateDoc } from 'firebase/firestore';
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { exec } from 'child_process';
import moment from 'moment';

@Injectable()
export class ProblemRepo {
  constructor(
    @InjectModel('problems') private readonly problemModel: Model<Problem>,
    @InjectModel('technical_types') private readonly probTypeModel: Model<TechnicalType>,
    @InjectModel('technical_items') private readonly technicalItemModel: Model<TechnicalItem>,
  ) { }

  async getProbTypeAll() {
    try {
      return await this.probTypeModel.aggregate([
        {
          $project: {
            _id: 0,
          },
        },
      ]).exec();
    } catch (error) {
      console.error("Error ProblemRepo.getProbTypeAll:", error);
      throw error;
    }
  }

  async getProbTypeByType(type: number) {
    try {
      return await this.probTypeModel.findOne({
        Technical_Item_Type_ID: Number(type),
      }).lean().exec();
    } catch (error) {
      console.error("Error ProblemRepo.getProbTypeAll:", error);
      throw error;
    }
  }

  async getTechnicalItemsByItemId(item_id: number) {
    try {
      return await this.technicalItemModel.findOne({
        Item_ID: Number(item_id),
      }).lean().exec();
    } catch (error) {
      console.error("Error ProblemRepo.getProbTypeAll:", error);
      throw error;
    }
  }

  async getTechnicalItemsByProbTypeId(probType_id: number) {
    try {
      return await this.technicalItemModel.aggregate([
        {
          $match: {
            Item_Type: Number(probType_id),
          },
        },
        {
          $project: {
            _id: 0,
            Item_ID: 1,
            Item_Desc: 1,

          },
        },
      ]).exec();;
    } catch (error) {
      console.error("Error ProblemRepo.getTechnicalItemsByProbTypeId:", error);
      throw error;
    }
  }

  async createProblem(data: any) {
    try {
      const saveData = new this.problemModel(data);
      await saveData.save();
      data.id = saveData.id;
      const docRef = doc(firestore, FIREBASE_CONSTANTS.COLLECTION.FIREBASE_COLLECTION, saveData.id);
      await setDoc(docRef, data);
    } catch (error) {
      console.error("Error ProblemRepo.createProblem:", error);
      throw error;
    }
  }

  async getProblemFirebaseBySiteId(site_id: string) {
    try {
      const problemCollection = collection(firestore, FIREBASE_CONSTANTS.COLLECTION.FIREBASE_COLLECTION);
      const q = query(
        problemCollection,
        where('site_id', '==', site_id),
        orderBy('update_date', 'desc')
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const filteredDocs = querySnapshot.docs
          .map(doc => doc.data())
          .filter(data => data.prob_status !== "ยืนยันการซ่อมสำเร็จ");

        return filteredDocs;
      } else {
        return [];
      }

    } catch (error) {
      console.error("Error ProblemRepo.getProblem:", error);
      throw error;
    }
  }

  async getProblemById(id: string) {
    try {
      return await this.problemModel.findOne({
        _id: id
      }).lean().exec();
    } catch (error) {
      console.error("Error ProblemRepo.getProblemFirebaseById:", error);
      throw error;
    }
  }

  async removeProbById(id: string) {
    try {
      await this.problemModel.findOneAndDelete({
        _id: id
      }).lean().exec();
      await this.removeProbFirebase(id);
    }
    catch(error) {
      console.error("Error ProblemRepo.removeProbById:", error);
      throw error;
    }
  }

  async removeProbFirebase(id: string) {
    try{
      const docRef = doc(firestore, FIREBASE_CONSTANTS.COLLECTION.FIREBASE_COLLECTION, id);
      await deleteDoc(docRef);
    }
    catch(error) {
      console.error("Error ProblemRepo.removeProbFirebase:", error);
      throw error;
    }
  }

  async updateStatusProb(id: string, status: string ,createBy: string, endDate?: Date){
    try {
      let updateData: { 
        prob_status: string; 
        update_date: string; 
        end_date?: string; 
      } = {
        prob_status: status,
        update_date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
      };
  
      if (endDate) {
        updateData.end_date = moment(endDate).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      }
      
      await this.problemModel.updateOne(
        { _id: id },
        {
          $set: updateData,
          $push: {
            prob_status_log: {
              create_by: createBy,
              create_date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
              prob_status: status,
            },
          },
        },
        { upsert: true }
      ).exec();

      const docRef = doc(firestore, FIREBASE_CONSTANTS.COLLECTION.FIREBASE_COLLECTION, id);
      await updateDoc(docRef, updateData);
    }
    catch(error) {
      console.error("Error ProblemRepo.updateStatusProb:", error);
      throw error;
    }
  }

  async getProblemHistoryBySiteId(siteId: string) {
    try {
      return await this.problemModel.aggregate([
        {
          $match: {
            site_id: siteId,
            prob_status: PROBLEM_CONSTANTS.STATES.CLOSE
          },
        },
        {
          $sort: { update_date: -1 },
        },
        {
          $project: {
            _id: 1,
            prob_id: 1,
            prob_name: 1,
            prob_type_name: 1,
            prob_item_name: 1,
            create_date: 1,
            create_by: 1,
            site_desc: 1,
          },
        },
      ]).exec();
    }
    catch (error) {
      console.error("Error ProblemRepo.updateStatusProb:", error);
      throw error;
    }
  }

  async getProblem(match: any) {
    try {
      return await this.problemModel.aggregate([
        {
          $match: match
        },
        {
          $sort: { update_date: -1 },
        },
        {
          $project: {
            _id: 1,
            prob_id: 1,
            prob_name: 1,
            prob_type_name: 1,
            prob_item_name: 1,
            create_date: 1,
            create_by: 1,
            site_desc: 1,
          },
        },
      ]).exec();
    }
    catch (error) {
      console.error("Error ProblemRepo.getProblem:", error);
      throw error;
    }
  }






  // async getProblemBySiteId(site_id: String) {
  //   try {

  //     const rs = await this.problemModel.aggregate([
  //       {
  //         $match: {
  //           site_id: site_id,
  //           prob_status: { $nin: ["สำเร็จ"] }
  //         },
  //       },
  //       {
  //         $project: {
  //           prob_id: '$prob_id',
  //           prob_name: '$prob_name',
  //           prob_type: '$prob_type',
  //           prob_detail: '$prob_detail',
  //           prob_status: '$prob_status',
  //           site_id: '$site_id',
  //           site_desc: '$site_desc',
  //           create_date: {
  //             $dateToString: {
  //               format: "%d/%m/%Y %H:%M",
  //               date: "$create_date"
  //             }
  //           },
  //           name: '$name',
  //         },
  //       },
  //     ]).sort({ create_date: -1 })
  //       .exec();
  //     return rs;
  //   }
  //   catch (err) {
  //     console.log("error Repo getProblemBySiteId");
  //   }
  // }
}
