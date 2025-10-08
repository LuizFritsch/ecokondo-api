import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CitiesService, City } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  list(): City[] {
    return this.citiesService.findAll();
  }

  @Get(':id')
  byId(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.findById(id);
  }

  @Get(':id/exchange-points')
  exchangePoints(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.listExchangePoints(id);
  }
}
