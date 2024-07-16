/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly brand: string;

  @ApiProperty()
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
