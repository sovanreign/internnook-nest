import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { passwordEncryption } from 'src/lib/password-encryption.util';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;

    const hashedPassword = await passwordEncryption(password);

    return this.db.user.create({
      data: {
        password: hashedPassword,
        ...user,
      },
    });
  }

  findAll() {
    return this.db.user.findMany({
      include: {
        company: true,
      },
    });
  }

  findOne(id: number) {
    return this.db.user.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await passwordEncryption(updateUserDto.password);
    }

    return this.db.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.db.user.delete({
      where: { id },
    });
  }
}
