
import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/profile')
  async profile(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.usersService.findById(userId);
    return {
      userId: user.userId,
      fullName: user.fullName,
      userType: user.userType,
      address: user.address,
      preferredCityId: user.preferredCityId,
    };
  }

  @Patch(':userId/preferred-city')
  async setPreferredCity(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('cityId') cityId: number,
  ) {
    const updated = await this.usersService.updatePreferredCity(userId, Number(cityId));
    return { preferredCityId: updated.preferredCityId };
  }
}
