/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto';

/* eslint-disable prettier/prettier */
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
