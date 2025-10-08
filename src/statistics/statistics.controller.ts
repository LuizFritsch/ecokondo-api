
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('users/:userId/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getStatistics(@Param('userId', ParseIntPipe) userId: number) {
    return this.statisticsService.getStatistics(userId);
  }
}
