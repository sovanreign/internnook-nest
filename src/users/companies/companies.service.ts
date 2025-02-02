import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { DatabaseService } from 'src/database/database.service';
import { join } from 'path';
import { unlink } from 'fs/promises';
import { UsersService } from '../users.service';

@Injectable()
export class CompaniesService {
  constructor(
    private db: DatabaseService,
    private usersService: UsersService,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.db.company.create({
      data: createCompanyDto,
    });
  }

  findAll() {
    return this.db.company.findMany();
  }

  findOne(id: number) {
    return this.db.company.findUniqueOrThrow({
      where: { userId: id },
      include: {
        user: true,
      },
    });
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
    file: Express.Multer.File,
  ) {
    const existingCompany = await this.findOne(id);

    let logoUrl = existingCompany.logoUrl;

    // Handle new file upload
    if (file) {
      logoUrl = `/uploads/${file.filename}`;

      // Delete the old logo file if it exists
      if (existingCompany.logoUrl) {
        const oldLogoPath = join(
          __dirname,
          '..',
          '..',
          '..',
          existingCompany.logoUrl,
        );
        await unlink(oldLogoPath).catch(() => {
          console.warn(`Failed to delete old logo at ${oldLogoPath}`);
        });
      }
    }

    return this.db.company.update({
      where: { userId: id },
      data: {
        ...updateCompanyDto,
        logoUrl,
      },
    });
  }

  async remove(id: number) {
    const existingCompany = await this.findOne(id);

    // Delete the logo file if it exists
    if (existingCompany.logoUrl) {
      const logoPath = join(
        __dirname,
        '..',
        '..',
        '..',
        existingCompany.logoUrl,
      );
      await unlink(logoPath).catch(() => {
        console.warn(`Failed to delete logo at ${logoPath}`);
      });
    }

    await this.db.company.delete({
      where: { userId: id },
    });

    await this.usersService.remove(id);
  }
}
