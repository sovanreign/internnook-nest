import { Test, TestingModule } from '@nestjs/testing';
import { MoasController } from './moas.controller';
import { MoasService } from './moas.service';

describe('MoasController', () => {
  let controller: MoasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoasController],
      providers: [MoasService],
    }).compile();

    controller = module.get<MoasController>(MoasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
