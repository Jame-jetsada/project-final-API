import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/model/profile.model';
import { ProfileRepo } from './profile.repo';
import { ProfileDto } from './profile.dto';
import { UtilService } from 'src/project-v0/common/util/util.service';

@Injectable()
export class ProfileService {
  constructor(
    private profileRepo: ProfileRepo,
    private utilSarvice: UtilService,
  ) { }
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
      if (rsProfile.length === 0) {
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


  async getProfileByToken(authToken) {
    let result: any = {};
    try {
      if (!authToken) {
        result.res_code = 'E101';
        result.res_msg = 'fail';
        return result;
      }
      const decodedToken = await this.utilSarvice.verifyToken(authToken);
      const emp_id = decodedToken.emp_id;
      const getProfile = await this.profileRepo.getProfileByEmpId(emp_id);
      result.res_code = '000';
      result.res_msg = 'success';
      result.datas = getProfile[0];
    }
    catch (error) {
      console.log('error service getProfileByToken');
    }
    return result;
  }
}
