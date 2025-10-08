
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('users/:userId/finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  getFinanceData(@Param('userId', ParseIntPipe) userId: number) {
    return this.financeService.getFinanceData(userId);
  }
}
