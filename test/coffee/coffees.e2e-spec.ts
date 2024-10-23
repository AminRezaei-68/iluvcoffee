/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto/create-coffee.dto';

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Shipwerk Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };
  let app: INestApplication;
  let coffeeId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedCoffee = expect.objectContaining({
          ...coffee,
          flavors: expect.arrayContaining(
            coffee.flavors.map((name) => expect.objectContaining({ name })),
          ),
        });
        coffeeId = body.id;
        expect(body).toEqual(expectedCoffee);
      });
  });
  it('Get all [GET /]', () => {
    return request(app.getHttpServer())
      .get('/coffees')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true); // بررسی اینکه پاسخ یک آرایه است
        expect(body).toEqual(
          expect.arrayContaining([
            // بررسی وجود قهوه ایجاد شده
            expect.objectContaining({
              id: coffeeId,
              ...coffee,
              flavors: expect.arrayContaining(
                coffee.flavors.map((name) => expect.objectContaining({ name })),
              ),
            }),
          ]),
        );
      });
  });
  it('Get one [GET /:id]', () => {
    return request(app.getHttpServer())
      .get(`/coffees/${coffeeId}`)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            id: coffeeId,
            ...coffee,
            flavors: expect.arrayContaining(
              coffee.flavors.map((name) => expect.objectContaining({ name })),
            ),
          }),
        );
      });
  });
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
