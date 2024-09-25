/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
// import { CoffeesService } from './coffees.service';
import { Connection, DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { Event } from '../events/entities/event.entity';
import { CoffeesService } from './coffees.service';
import configCoffees from './config/coffees.config';
import { ConfigModule } from '@nestjs/config';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [
    //     CoffeesService,
    //     { provide: DataSource, useValue: {} },
    //     { provide: getRepositoryToken(Flavor), useValue: {} },
    //     { provide: getRepositoryToken(Coffee), useValue: {} },
    //   ],
    // }).compile();

    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(configCoffees)], // Add
      // controllers: [], // Add
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Coffee),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: {},
        },
      ], // Add
    }).compile();

    // service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
    expect(true);
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {});
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {});
    });
  });
});
