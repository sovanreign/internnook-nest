import { Injectable } from '@nestjs/common';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { UpdateInternshipDto } from './dto/update-internship.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InternshipsService {
  constructor(private db: DatabaseService) {}

  create(createInternshipDto: CreateInternshipDto) {
    return this.db.internship.create({
      data: createInternshipDto,
    });
  }

  findAll() {
    return this.db.internship.findMany({
      include: {
        company: true,
      },
    });
  }

  findOne(id: number) {
    return this.db.internship.findUniqueOrThrow({
      where: { id },
      include: {
        company: true,
      },
    });
  }

  update(id: number, updateInternshipDto: UpdateInternshipDto) {
    return this.db.internship.update({
      where: { id },
      data: updateInternshipDto,
    });
  }

  remove(id: number) {
    return this.db.internship.delete({
      where: { id },
    });
  }
}
