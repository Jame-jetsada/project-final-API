import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { saveUserDto } from './auth.dto';
import { loginDto } from './auth.dto';

@Controller('project-v0/auth')
export class AuthController {
    constructor(private authService: AuthService) {}


//   @Get('login/:username/:password')
//   async loginByusername(
//     @Param('username') username: String,
//     @Param('password') password: String,
//   ) {
//     return await this.authService.loginByusername(username, password);
//   }
  @Post('login-mobile')
  async loginMobile(@Body() data: loginDto) {
    return await this.authService.loginMobile(data);
  }
  @Get('login/:username/:password')
  async loginByusername(
    @Param('username') username: String,
    @Param('password') password: String,
  ) {
    return await this.authService.getloginMobile(username, password);
  }

  @Post('profile-save')
  async createProfile(@Body() data: saveUserDto) {
    return await this.authService.saveUser(data);
  }
}
