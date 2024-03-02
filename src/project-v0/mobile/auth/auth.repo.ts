import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/model/profile.model';

@Injectable()
export class AuthRepo {
    constructor(
        @InjectModel('profiles') private readonly profileModel: Model<Profile>,
      ) {}

      async saveUser(data: any){
        let result:any = {};
        try{
            const saveData = new this.profileModel(data);
            const rsSaveModalHis = await saveData.save();
            result.res_data = rsSaveModalHis;
        }
        catch(error){
            console.log("error");
        }
        return result;
      }

      async findUserBtUsername(username: String): Promise<any> {
        return await this.profileModel.findOne({
            username: username
        }).exec();
    }
}
