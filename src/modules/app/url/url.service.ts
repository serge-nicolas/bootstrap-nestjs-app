import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlService {
  private readonly urls: Partial<Url>[] = [
    {
      uuid: 'sdsdsdsd',
      address: 'sdsdsdsd',
    },
  ];
  create(createUrlDto: CreateUrlDto) {
    return 'This action adds a new url';
  }

  findAll() {
    return `This action returns all url`;
  }

  findOne(id: string) {
    return this.urls.find((user) => user.uuid === id);
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
