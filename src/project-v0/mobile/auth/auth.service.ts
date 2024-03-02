import { Injectable } from '@nestjs/common';
import { AuthRepo } from './auth.repo';
import { saveUserDto } from './auth.dto';
import { UtilService } from 'src/project-v0/common/util/util.service';
import { loginDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private authRepo: AuthRepo,
        private utilSarvice: UtilService,
    ) { }

    async saveUser(data: saveUserDto) {
        let result: any = {};
        try {
            const datas = {
                phone_number: data.phone_number,
                username: data.username,
                password: await this.utilSarvice.getHash(data.password),
                site_id: data.site_id,
                site_name: data.site_name,
                firstname: data.firstname,
                lastname: data.lastname,
                emp_id: data.emp_id,
                emp_position: data.emp_position,
                image: data.image,
                create_date: new Date(),
            }
            const createUser = await this.authRepo.saveUser(datas);
            result.res_code = '000';
            result.res_msg = 'success';
        }
        catch (error) {
            console.log("error");
        }
        return result;
    }

    async loginMobile(data : loginDto){
        let result:any = {};
        try{
            const rsUser = await this.authRepo.findUserBtUsername(data.username);
            if(!rsUser){
                result.res_code = "E101";
                result.res_msg = "fail";
                return result;
            }
            const isCompare = await this.utilSarvice.compareHash(data.password, rsUser.password);
            if(!isCompare){
                result.res_code = "E102";
                result.res_msg = "fail";
                return result;
            }
            let tokenData: any ={
                emp_id: rsUser.emp_id
            };
            const rsToken = await this.utilSarvice.signToken(tokenData);
            result.res_code = "000";
            result.res_msg = "success";
            result.datas = {
                Token : rsToken,
            }
        }
        catch(error) {
            console.log("error");
        }
        return result;
    }
}
