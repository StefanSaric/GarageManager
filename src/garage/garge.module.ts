import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garage } from './garage.entity';
import { GarageService } from './garage.service';
import { GarageController } from './garage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Garage])],
  providers: [GarageService],
  controllers: [GarageController],
})
export class GarageModule {}
