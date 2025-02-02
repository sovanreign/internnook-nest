import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateMoaDto } from './dto/create-moa.dto';
import { UpdateMoaDto } from './dto/update-moa.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MoasService {
  constructor(
    private db: DatabaseService,
    private readonly config: ConfigService,
  ) {}

  async createMany(data: CreateMoaDto[]) {
    const createdMoas = await this.db.mOA.createMany({
      data,
      skipDuplicates: true,
    });

    const updatedMoas = await Promise.all(
      data.map(async (moa) => {
        const submissionData = {
          template_id: '577208',
          send_email: false,
          submitters: [
            { email: await this.getEmailById(moa.studentId), role: 'Student' },
            {
              email: await this.getEmailById(moa.coordinatorId),
              role: 'Coordinator',
            },
            { email: await this.getEmailById(moa.companyId), role: 'Company' },
          ],
        };

        try {
          const response = await axios.request({
            method: 'POST',
            url: 'https://api.docuseal.com/submissions',
            headers: {
              'X-Auth-Token': this.config.get('DOCUSEAL_API_KEY'),
              'content-type': 'application/json',
            },
            data: submissionData,
          });

          const slugs = response.data.map((item) => item.slug);

          // Step 3: Update the MOA with slugs
          return this.db.mOA.update({
            where: { id: moa.applicationId }, // Ensure the correct MOA is updated
            data: {
              studentSlug: slugs[0] || null,
              coordinatorSlug: slugs[1] || null,
              companySlug: slugs[2] || null,
            },
          });
        } catch (error) {
          console.error(
            `Error fetching DocuSeal slug for MOA ID ${moa.applicationId}:`,
            error,
          );
          return null;
        }
      }),
    );

    return updatedMoas;
  }

  private async getEmailById(userId: number): Promise<string> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    return user?.email || 'no-email@example.com';
  }

  create(createMoaDto: CreateMoaDto) {
    // return this.db.mOA.create({
    //   data: createMoaDto,
    // });
  }

  findAll() {
    return this.db.mOA.findMany({
      include: {
        student: {
          include: {
            user: true,
          },
        },
        coordinator: {
          include: {
            user: true,
          },
        },
        company: {
          include: {
            user: true,
          },
        },
        application: {
          include: {
            internship: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.db.mOA.findUniqueOrThrow({
      where: { id },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        coordinator: {
          include: {
            user: true,
          },
        },
        company: {
          include: {
            user: true,
          },
        },
        application: true,
      },
    });
  }

  update(id: number, updateMoaDto: UpdateMoaDto) {
    return this.db.mOA.update({
      where: { id },
      data: updateMoaDto,
    });
  }

  remove(id: number) {
    return this.db.mOA.delete({
      where: { id },
    });
  }
}
