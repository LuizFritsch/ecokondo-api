import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FinanceModule } from './finance/finance.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UsersModule } from './users/users.module';
import { CitiesModule } from './cities/cities.module';
import { MaterialsModule } from './materials/materials.module';

@Module({
  imports: [
    StatisticsModule,
    AuthModule,
    UsersModule,
    FinanceModule,
    CitiesModule,
    MaterialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
