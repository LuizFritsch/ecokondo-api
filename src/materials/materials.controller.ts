import { Controller, Get } from '@nestjs/common';
import { MaterialsService } from './materials.service';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  list() {
    const response = this.materialsService.getAll();
    console.log(`[MATERIALS] response: ${JSON.stringify(response)}`);
    return response;
  }
}
