import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PurchasesService } from './purchases.service';

@Controller('finance/purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get(':userId')
  async getUserPurchases(@Param('userId', ParseIntPipe) userId: number) {
    return this.purchasesService.getUserPurchases(userId);
  }
}
