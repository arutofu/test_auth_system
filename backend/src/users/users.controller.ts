import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';

@Controller()
export class UsersController {
  @UseGuards(JwtGuard)
  @Get('me')
  me(@Req() req: any) {
    return {
      id: req.user.sub,
      email: req.user.email,
      role: req.user.role,
    };
  }
}
