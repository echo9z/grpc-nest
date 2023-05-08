import { CreateCatInput } from './create-cat.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCatInput extends PartialType(CreateCatInput) {
  id: number;
}
