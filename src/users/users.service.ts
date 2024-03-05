import { Injectable } from '@nestjs/common';
import { CreateUser } from './dto/user-create.dto';
import { UpdateUser } from './dto/user-update.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  get(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(body: CreateUser) {
    const password = encodePassword(body.password);
    const newUser = this.userRepository.create({ ...body, password });
    return this.userRepository.save(newUser);
  }

  update(body: UpdateUser, userId: string) {
    return this.userRepository.update(userId, body);
  }

  getById(userId: number) {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }

  getByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  delete(userId: number) {
    return this.userRepository.delete(userId);
  }
}
