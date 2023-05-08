/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Pagination } from "./common";

export const protobufPackage = "cats";

/** message定义结构 */
export interface ById {
  /** 对于设置最频繁的字段，您应该使用字段编号1到15。较低的字段编号值在线格式中占用的空间更少。例如，1到15范围内的字段编号需要一个字节进行编码。16到2047范围内的字段编号需要两个字节。 */
  id: number;
}

/** 返回Cats数组 */
export interface CatsData {
  cats: Cat[];
}

/** 返回类型 */
export interface Cat {
  id: number;
  name: string;
}

export const CATS_PACKAGE_NAME = "cats";

export interface CatsServiceClient {
  findOne(request: ById, meta?: any): Observable<Cat>;

  findMany(request: Pagination): Observable<CatsData>;
}

export interface CatsServiceController {
  findOne(request: ById): Promise<Cat> | Observable<Cat> | Cat;

  findMany(request: Pagination): Promise<CatsData> | Observable<CatsData> | CatsData;
}

export function CatsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "findMany"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CatsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CatsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CATS_SERVICE_NAME = "CatsService";
