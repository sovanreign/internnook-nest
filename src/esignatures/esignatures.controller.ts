import { Controller, Get } from '@nestjs/common';
import { EsignaturesService } from './esignatures.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Controller('api/esignatures')
export class EsignaturesController {
  constructor(
    private readonly esignaturesService: EsignaturesService,
    private config: ConfigService,
  ) {}

  @Get('init_form')
  async submission() {
    const submissionData = {
      template_id: '577208',
      send_email: false,
      submitters: [
        {
          email: 'hello@mapakode.com',
          role: 'Company',
        },
        {
          email: 'jdurbano@gbox.ncf.edu.ph',
          role: 'Student',
        },
      ],
    };

    const response = await axios.request({
      method: 'POST',
      url: 'https://api.docuseal.com/submissions',
      headers: {
        'X-Auth-Token': this.config.get('DOCUSEAL_API_KEY'),
        'content-type': 'application/json',
      },
      data: submissionData,
    });

    console.log(response);

    const slug = response.data[0].slug;

    console.log(slug);

    return { slug };
  }
}
