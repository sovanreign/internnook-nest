import { Injectable } from '@nestjs/common';
import { CreateCoordinatorDto } from './dto/create-coordinator.dto';
import { UpdateCoordinatorDto } from './dto/update-coordinator.dto';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from '../users.service';
import { nanoid } from 'nanoid';

@Injectable()
export class CoordinatorsService {
  constructor(
    private db: DatabaseService,
    private usersService: UsersService,
  ) {}

  async create(createCoordinatorDto: CreateCoordinatorDto) {
    const inviteCode = await this.generateUniqueInviteCode();

    return this.db.coordinator.create({
      data: {
        inviteCode,
        ...createCoordinatorDto,
      },
    });
  }

  findAll() {
    return this.db.coordinator.findMany({ include: { user: true } });
  }

  findOne(id: number) {
    return this.db.coordinator.findUnique({
      where: { userId: id },
    });
  }

  update(id: number, updateCoordinatorDto: UpdateCoordinatorDto) {
    return this.db.coordinator.update({
      where: { userId: id },
      data: updateCoordinatorDto,
    });
  }

  async remove(id: number) {
    await this.db.coordinator.delete({
      where: { userId: id },
    });

    await this.usersService.remove(id);
  }

  private async generateUniqueInviteCode(): Promise<string> {
    let inviteCode: string;
    let isUnique = false;

    while (!isUnique) {
      // Generate a random alphanumeric string of length 8
      inviteCode = nanoid(6);

      // Check if the invite code already exists in the database
      const existingCode = await this.db.coordinator.findUnique({
        where: { inviteCode },
      });

      // If no existing code is found, it's unique
      isUnique = !existingCode;
    }

    return inviteCode;
  }
}
