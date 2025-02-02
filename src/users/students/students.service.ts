import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from '../users.service';
import { join } from 'path';
import { unlink } from 'fs/promises';

@Injectable()
export class StudentsService {
  constructor(
    private db: DatabaseService,
    private usersService: UsersService,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    return this.db.student.create({
      data: createStudentDto,
    });
  }

  findAll() {
    return this.db.student.findMany();
  }

  findOne(id: number) {
    return this.db.student.findUniqueOrThrow({
      where: { userId: id },
    });
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
    file: Express.Multer.File,
  ) {
    const existingStudent = await this.findOne(id);

    let resumeUrl = existingStudent.resumeUrl;

    // Handle new file upload
    if (file) {
      resumeUrl = `/uploads/${file.filename}`;

      // Delete the old logo file if it exists
      if (existingStudent.resumeUrl) {
        const oldResumePath = join(
          __dirname,
          '..',
          '..',
          '..',
          existingStudent.resumeUrl,
        );
        await unlink(oldResumePath).catch(() => {
          console.warn(`Failed to delete old resume at ${oldResumePath}`);
        });
      }
    }

    return this.db.student.update({
      where: { userId: id },
      data: {
        ...updateStudentDto,
        resumeUrl,
      },
    });
  }

  async remove(id: number) {
    const existingStudent = await this.findOne(id);

    // Delete the logo file if it exists
    if (existingStudent.resumeUrl) {
      const resumePath = join(
        __dirname,
        '..',
        '..',
        '..',
        existingStudent.resumeUrl,
      );
      await unlink(resumePath).catch(() => {
        console.warn(`Failed to delete resume at ${resumePath}`);
      });
    }

    await this.db.student.delete({
      where: { userId: id },
    });

    await this.usersService.remove(id);
  }
}
