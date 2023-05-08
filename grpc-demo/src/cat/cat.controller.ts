import { Controller } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { ById, Cat } from '../gen-code/cats'
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js'

@Controller()
export class CatController {
  constructor(private readonly catService: CatService) {}

  // 参数1：对应cat.proto中的HeroesService服务定
  // 参数2：对应于hero.proto文件中HeroesService中定义的FindOne（）rpc方法
  @GrpcMethod('CatsService', 'FindOne')
  // 从调用者传递data，存储gRPC请求元数据的metadata，以及call获取GrpcCall对象属性，如sendMetadata，以将元数据发送到客户端。
  findOne(data: ById, metadata: Metadata, call: ServerUnaryCall<any, any>): Cat {
    console.log(data, metadata, call);
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
      { id: 3, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
