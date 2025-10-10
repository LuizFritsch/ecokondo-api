import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { UsersModule } from '../users/users.module';
import { CitiesModule } from '../cities/cities.module';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';

@Module({
  imports: [UsersModule, CitiesModule],
  providers: [FinanceService, PurchasesService],
  controllers: [FinanceController, PurchasesController],
  exports: [FinanceService],
})
export class FinanceModule {}
