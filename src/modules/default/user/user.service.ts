import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { SortBy } from '@/decorators/mechanicals/sortBy.decorator';

@Injectable()
export class UserService {
  private readonly users: Partial<User>[] = [
    {
      id: 1,
      userlogin: 'john',
      password: 'changeme',
      email: 'test@dsddd.com',
    },
  ];
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  @SortBy('userlogin')
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.users.find((user) => user.uuid === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
