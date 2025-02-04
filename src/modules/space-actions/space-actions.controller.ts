import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { SpaceActionsService } from './space-actions.service';

@Controller('/space/actions')
@UseGuards(JwtAuthGuard)
export class SpaceActionsController {
  constructor(private spaceActionsService: SpaceActionsService) {}
  @Get()
  async getSpaceActions() {
    return await this.spaceActionsService.getSpaceActions();
  }
}
