import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ApplicationsService {
  constructor(private db: DatabaseService) {}

  create(createApplicationDto: CreateApplicationDto) {
    return this.db.application.create({
      data: createApplicationDto,
    });
  }

  findAll() {
    return this.db.application.findMany({
      include: {
        student: true,
        internship: {
          include: {
            company: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.db.application.findUniqueOrThrow({
      where: { id },
      include: {
        student: true,
        internship: {
          include: {
            company: true,
          },
        },
      },
    });
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return this.db.application.update({
      where: { id },
      data: updateApplicationDto,
    });
  }

  remove(id: number) {
    return this.db.application.delete({ where: { id } });
  }
}
