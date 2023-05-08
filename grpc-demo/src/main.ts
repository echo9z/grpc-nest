import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestMicroservice } from '@nestjs/common';

async function bootstrap() {
  // console.log(join(__dirname, '../../proto/cats.proto'))
  const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051', // 格式为ip address/dns name:port的字符
      package: 'cats', // 匹配.proto文件中的package设置
      protoPath: join(__dirname, '../../proto/cats.proto'),
    },
  });
  await app.listen();
}
bootstrap();
