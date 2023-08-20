import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './project-v0/profile/profile.module';
import { ProductModule } from './project-v0/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProfileModule,
    ProductModule,
    MongooseModule.forRoot(
      'mongodb+srv://jamejetsada121:jame123456@cluster0.yvzvrxd.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
