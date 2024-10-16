import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './project-v0/mobile/profile/profile.module';
import { ProductModule } from './project-v0/mobile/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './project-v0/mobile/auth/auth.module';
import { ProblemModule } from './project-v0/mobile/problem/problem.module';
import { InspectionRoundModule } from './project-v0/web/inspection_round/inspection_round.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ทำให้สามารถใช้งาน config ได้ทั่วโปรเจค
    }),
    ProfileModule,
    ProductModule,
    AuthModule,
    ProblemModule,
    InspectionRoundModule,
    MongooseModule.forRoot(process.env.MONGO_BD),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
