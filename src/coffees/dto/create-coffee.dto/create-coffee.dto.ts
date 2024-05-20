/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}
// export class CreateCoffeeDto {
//   id: number;

//   readonly name: string;

//   readonly brand: string;

//   @IsString({ each: true })
//   readonly flavors: string[];
// }
