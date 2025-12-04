import { Garage } from './garage.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

export class GarageService {
  constructor(
    @InjectRepository(Garage)
    private readonly garageRepository: Repository<Garage>,
  ) {}

  findAll(): Promise<Garage[]> {
    return this.garageRepository.find();
  }

  async findOne(id: string): Promise<Garage> {
    const garage = await this.garageRepository.findOneBy({ id });
    if (!garage) {
      throw new NotFoundException(`Garage with id ${id} not found`);
    }
    return garage;
  }

  create(garageData: Partial<Garage>): Promise<Garage> {
    const garage = this.garageRepository.create(garageData);
    return this.garageRepository.save(garage);
  }

  async update(id: string, garageData: Partial<Garage>): Promise<Garage> {
    await this.garageRepository.update(id, garageData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.garageRepository.delete(id);
  }
}
