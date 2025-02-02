import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  HttpCode,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          callback(null, `resume-${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  create(
    @Body() createStudentDto: CreateStudentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const resumeUrl = file ? `/uploads/${file.filename}` : null;

    createStudentDto.userId = parseInt(createStudentDto.userId as any);
    createStudentDto.coordinatorId = parseInt(
      createStudentDto.coordinatorId as any,
    );

    return this.studentsService.create({
      resumeUrl,
      ...createStudentDto,
    });
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          callback(null, `resume-${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    updateStudentDto.userId = parseInt(updateStudentDto.userId as any);
    updateStudentDto.coordinatorId = parseInt(
      updateStudentDto.coordinatorId as any,
    );

    return this.studentsService.update(+id, updateStudentDto, file);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
