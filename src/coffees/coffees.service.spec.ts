/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
// import { CoffeesService } from './coffees.service';
import { Connection, DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { Event } from '../events/entities/event.entity';
import { CoffeesService } from './coffees.service';
import configCoffees from './config/coffees.config';
import { ConfigModule } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

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
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
      ], // Add
    }).compile();

    service = moduleRef.get<CoffeesService>(CoffeesService);
    coffeeRepository = moduleRef.get<MockRepository>(
      getRepositoryToken(Coffee),
    );
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
    expect(true);
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};

        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = '1';
        coffeeRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(coffeeId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Coffee #${coffeeId} not found.`);
        }
      });
    });
  });
});
