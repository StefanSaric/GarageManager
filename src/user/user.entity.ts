import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from './enum/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  roles: Role;
}
