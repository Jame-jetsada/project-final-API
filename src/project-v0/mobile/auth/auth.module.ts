import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepo } from './auth.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { profileSchema } from 'src/model/profile.model';
import { UtilService } from 'src/project-v0/common/util/util.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'profiles', schema: profileSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepo, UtilService],
  exports: [AuthService],
})
export class AuthModule {}
