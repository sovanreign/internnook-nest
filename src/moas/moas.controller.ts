import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoasService } from './moas.service';
import { CreateMoaBulkDto, CreateMoaDto } from './dto/create-moa.dto';
import { UpdateMoaDto } from './dto/update-moa.dto';

@Controller('api/moas')
export class MoasController {
  constructor(private readonly moasService: MoasService) {}

  @Post('bulk')
  async createMany(@Body() createMoaBulkDto: CreateMoaBulkDto) {
    return this.moasService.createMany(createMoaBulkDto.data);
  }

  @Post()
  create(@Body() createMoaDto: CreateMoaDto) {
    return this.moasService.create(createMoaDto);
  }

  @Get()
  findAll() {
    return this.moasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moasService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateMoaDto: UpdateMoaDto, @Param('id') id: string) {
    return this.moasService.update(+id, updateMoaDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moasService.remove(+id);
  }
}
