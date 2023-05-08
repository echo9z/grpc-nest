import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatResolver } from './cat.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CAT_GRPC',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: 'cats',
          protoPath: join(__dirname ,'../../../../proto/cats.proto'),
        },
      },
    ])
  ],
  providers: [CatResolver, CatService]
})
export class CatModule {}
