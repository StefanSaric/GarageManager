import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException(`User with id ${email} not found`);
    return user;
  }

  async create(createData: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createData.password, 10);

    const user = this.userRepository.create({
      ...createData,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`User with id ${id} not found`);
  }
}
