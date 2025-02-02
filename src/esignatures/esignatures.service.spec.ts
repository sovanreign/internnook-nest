import { Test, TestingModule } from '@nestjs/testing';
import { EsignaturesService } from './esignatures.service';

describe('EsignaturesService', () => {
  let service: EsignaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EsignaturesService],
    }).compile();

    service = module.get<EsignaturesService>(EsignaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
