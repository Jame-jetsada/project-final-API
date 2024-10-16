import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { initializeApp } from 'firebase/app';
// import { firebaseConfig } from 'src/firebase/init.firestore';

async function bootstrap() {
  // initializeApp(firebaseConfig);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
