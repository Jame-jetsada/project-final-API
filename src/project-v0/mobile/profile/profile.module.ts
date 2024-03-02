import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { profileSchema } from 'src/model/profile.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileRepo } from './profile.repo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'profiles', schema: profileSchema }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepo],
  exports: [ProfileService],
})
export class ProfileModule {}
