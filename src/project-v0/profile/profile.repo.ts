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

  async createProfile(data: any): Promise<any> {
    let result: any = {};
    try {
      const Dates = {
        phone_number: data.phone_number,
        username: data.username,
        password: data.password,
        created_date: new Date(),
        oo: data.oo,
      };
      const saveData = new this.profileModel(Dates);
      const rsSaveModalHis = await saveData.save();

      result.res_data = rsSaveModalHis;
    } catch (error) {}
    return result;
  }

  async loginUser(username: String, password: String) {
    return await this.profileModel
      .aggregate([
        {
          $match: {
            username: username,
            password: password,
          },
        },
        {
          $project: {
            phone_number: '$phone_number',
          },
        },
      ])
      .exec();
  }
}
