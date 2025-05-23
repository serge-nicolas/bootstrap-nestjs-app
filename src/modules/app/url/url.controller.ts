import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('/url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  create(@Body() createUserDto: CreateUrlDto) {
    return this.urlService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUrlDto) {
    return this.urlService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlService.remove(+id);
  }
}
