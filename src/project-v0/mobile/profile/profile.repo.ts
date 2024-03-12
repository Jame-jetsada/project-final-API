import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/model/profile.model';

@Injectable()
export class ProfileRepo {
  constructor(
    @InjectModel('profiles') private readonly profileModel: Model<Profile>,
  ) {}
  async getProfileRepo() {
    return await this.profileModel.find();
  }

  async getProfileByEmpId(emp_id: String) {
    let result:any = {};
    try{
      result = await this.profileModel.aggregate([
        {
          $match: {
            emp_id: emp_id,
          },
        },
        {
          $project: {
            phone_number: '$phone_number',
            firstname: '$firstname',
            lastname: '$lastname',
            site_id: '$site_id',
            site_name: '$site_name',
            emp_id: '$emp_id',
            emp_position: '$emp_position',
            image : '$image',

          },
        },
      ])
      .exec();

    }
    catch(error){
      console.log("Error Repo getProfileByEmpId");
    }
    return result;
  }

  async createProfile(data: any): Promise<any> {
    let result: any = {};
    try {
      const Datas = {
        phone_number: data.phone_number,
        username: data.username,
        password: data.password,
        created_date: new Date(),
        oo: data.oo,
      };
      const saveData = new this.profileModel(Datas);
      const rsSaveModalHis = await saveData.save();

      result.res_data = rsSaveModalHis;
    } catch (error) {}
    return result;
  }
}
