import { Test, TestingModule } from '@nestjs/testing';
import { EsignaturesController } from './esignatures.controller';
import { EsignaturesService } from './esignatures.service';

describe('EsignaturesController', () => {
  let controller: EsignaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EsignaturesController],
      providers: [EsignaturesService],
    }).compile();

    controller = module.get<EsignaturesController>(EsignaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
