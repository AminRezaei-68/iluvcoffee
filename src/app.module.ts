/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions } from './ormconfig';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { CoffeeRatingService } from './coffee-rating/coffee-rating.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      // add new config for fix mirations
      // TypeOrmModule.forRootAsync({
      // imports: [ConfigModule],
      // inject: [ConfigService],
      // useFactory: (configService: ConfigService) => ({
      //   type: 'postgres',
      //   host: configService.get('POSTGRES_HOST'),
      //   port: configService.get('POSTGRES_PORT'),
      //   username: configService.get('POSTGRES_USER'),
      //   password: configService.get('POSTGRES_PASSWORD'),
      //   database: configService.get('POSTGRES_DB'),
      //   entities: [],
      //   autoLoadEntities: true,
      // }),
      // end of new config for migrations

      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, CoffeeRatingService],
})
export class AppModule {}
