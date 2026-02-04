import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  countAll() {
    return this.usersRepository.count();
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  createUser(data: Partial<User>) {
    return this.usersRepository.save(this.usersRepository.create(data));
  }

  async ensureFirstAdmin(email: string, password: string) {
    const adminsCount = await this.usersRepository.count({ where: { role: UserRole.ADMIN } });
    if (adminsCount > 0){
      Logger.log('Admin already exist');
    } 
    else {
      Logger.log('Admin doesnt exist');
        const passwordHash = await bcrypt.hash(password, 10);

        await this.usersRepository.save(
          this.usersRepository.create({
            email,
            passwordHash,
            role: UserRole.ADMIN,
          }),
    );
    return;
  }
  }
}