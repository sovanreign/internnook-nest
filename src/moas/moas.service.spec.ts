import { Test, TestingModule } from '@nestjs/testing';
import { MoasService } from './moas.service';

describe('MoasService', () => {
  let service: MoasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoasService],
    }).compile();

    service = module.get<MoasService>(MoasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
