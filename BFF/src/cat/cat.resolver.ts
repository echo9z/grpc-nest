import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
// import { CatService } from './cat.service';
import { CreateCatInput } from './dto/create-cat.input';
import { UpdateCatInput } from './dto/update-cat.input';
import { Inject, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import { CatsServiceClient, ById } from '../gen-code/cats'

@Resolver('Cat')
export class CatResolver implements OnModuleInit {
  private catsServices: CatsServiceClient;

  constructor(
    @Inject('CAT_GRPC') private client: ClientGrpc,
    // private readonly catService: CatService
  ) {}

  onModuleInit() {
    this.catsServices = this.client.getService<CatsServiceClient>('CatsService');
  }

  @Mutation('createCat')
  create(@Args('createCatInput') createCatInput: CreateCatInput) {
    // return this.catService.create(createCatInput);
  }

  @Query('cats')
  findAll() {
    // return this.catService.findAll();
  }

  @Query('cat')
  findOne(@Args('id', { type: () => ID }) id: number) {
    console.log(id);
    // const metadata = new Metadata();
    // metadata.add('Set-Cookie', 'yummy_cookie=choco');
    // return this.catsServices.findOne({ id }, metadata);
    return this.catsServices.findOne({ id });
  }

  @Mutation('updateCat')
  update(@Args('updateCatInput') updateCatInput: UpdateCatInput) {
    // return this.catService.update(updateCatInput.id, updateCatInput);
  }

  @Mutation('removeCat')
  remove(@Args('id') id: number) {
    // return this.catService.remove(id);
  }
}
