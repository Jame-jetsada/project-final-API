import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/model/profile.model';
import { ProfileRepo } from './profile.repo';
import { ProfileDto } from './profile.dto';

@Injectable()
export class ProfileService {
  constructor(private profileRepo: ProfileRepo) {}
  async getProfile() {
    let result: any = {};
    try {
      const rsProfile = await this.profileRepo.getProfileRepo();
      result.res_code = '000';
      result.res_msg = 'success';
      result.datas = rsProfile;
    } catch (error) {
      
    }
    return result;
  }

  async getProfileByEmpId(emp_id: String) {
    let result: any = {};
    try {
      const rsProfile = await this.profileRepo.getProfileByEmpId(emp_id);
      if(rsProfile.length === 0){
        result.res_code = 'E101';
        result.res_msg = 'fail';
        return result;
      }
      result.res_code = '000';
      result.res_msg = 'success';
      result.datas = rsProfile;
    } catch (error) {
      console.log("error getProfileByEmpId");
    }
    return result;
  }

  async ProfileUser(data: ProfileDto) {
    let result: any = {};
    try {
      const rsProfile = await this.profileRepo.createProfile(data);
      result.res_code = '000';
      result.res_msg = 'success';
    } catch (error) {
      console.log('error service ProfileUser');
    }
    return result;
  }

  async loginByusername(username: String, password: String) {
    let result: any = {};
    try {
      const userConfirm = await this.profileRepo.loginUser(username, password);

      if (userConfirm.length === 0) {
        result.res_code = 'E101';
        result.res_msg = 'fail';
      } else {
        result.res_code = '000';
        result.res_msg = 'success';
      }
    } catch (error) {
      console.log('error service loginByusername');
    }
    return result;
  }
}
