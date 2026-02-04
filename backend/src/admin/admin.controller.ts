import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtGuard } from '../auth/jwt.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly users: UsersService) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Get('users')
  async listUsers() {
    const list = await this.users.findAll();
    return list.map(u => ({
      id: u.id,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
    }));
  }
}
