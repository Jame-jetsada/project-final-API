import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ProfileDto } from './profile.dto';
import { Request, Response } from 'express';
import { ProfileService } from './profile.service';

@Controller('project-v0/profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Get()
  async getProfile() {
    return await this.profileService.getProfile();
  }
  @Get('getProfileByToken')
  async getProfileByToken(@Req() req: Request, @Res() res: Response,){
    const rs = await this.profileService.getProfileByToken(req.header('X-Authorization'));
    return res.json(rs);
  }

  @Get('getUser-by-empid/:emp_id')
  async getProfileByEmp_id(@Param('emp_id') emp_id: String) {
    return await this.profileService.getProfileByEmpId(emp_id);
  }
  @Post('profile_save')
  async createProfile(@Body() data: ProfileDto) {
    return await this.profileService.ProfileUser(data);
  }
}
