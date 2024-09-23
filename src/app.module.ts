import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './project-v0/mobile/profile/profile.module';
import { ProductModule } from './project-v0/mobile/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './project-v0/mobile/auth/auth.module';
import { ProblemModule } from './project-v0/mobile/problem/problem.module';

@Module({
  imports: [
    ProfileModule,
    ProductModule,
    AuthModule,
    ProblemModule,
    MongooseModule.forRoot(
      'mongodb+srv://jamejetsada121:jame123456@cluster0.yvzvrxd.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
