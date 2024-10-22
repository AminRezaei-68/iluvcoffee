/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection, DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ], //.forFeature register typeorm in this child module
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ['buddy brew', 'nescafe'],
      scope: Scope.TRANSIENT,
    },
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: async (connection: DataSource): Promise<string[]> => {
    //     //DataSouce Connection
    //     const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
    //     console.log('Async Factory');
    //     return coffeeBrands;
    //   },
    //   scope: Scope.TRANSIENT,
    //   inject: [DataSource],
    // },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
