import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/crud/user/dto/user.dto';
import { Users } from 'src/typeorm/schema/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async getAll() {
    return await this.userRepository.find();
  }

  async getUser(userDto: UserDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { ...userDto } });
    if (!user) throw new NotFoundException('User not found');
    return JSON.stringify(user);
  }

  async validateUser(userDto: UserDto): Promise<boolean> {
    return !!(await this.userRepository.findOne({
      where: { username: userDto.username },
    }));
  }
}
