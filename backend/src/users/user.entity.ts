import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')                // Таблица users
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })     // Email уникальный
  email: string;

  @Column()
  passwordHash: string;

  @Column({ 
    type: 'enum', 
    enum: UserRole, 
    default: UserRole.USER 
    })
    role: UserRole;

  @CreateDateColumn()           // Автозаполняемая дата создания
  createdAt: Date;
}
