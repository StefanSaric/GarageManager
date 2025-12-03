import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GarageService } from './garage.service';
import { Garage } from './garage.entity';

@Controller('garage')
export class GarageController {
    constructor(private readonly garageService: GarageService) {
    }

    @Get()
    async findAll(): Promise<Garage[]> {
        return this.garageService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Garage> {
        return this.garageService.findOne(id);
    }

    @Post()
    async create(@Body() garageData: Partial<Garage>): Promise<Garage> {
        return this.garageService.create(garageData);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() garageData: Partial<Garage>): Promise<Garage> {
        return this.garageService.update(id, garageData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.garageService.remove(id);
    }

}