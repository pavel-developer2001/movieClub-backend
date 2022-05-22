import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { BookMarkEntity } from './entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(BookMarkEntity)
    private repository: Repository<BookMarkEntity>,
  ) {}
  async create(createBookMarkDto: CreateBookmarkDto, userId: number) {
    const candidate = await this.repository.findOne({
      where: {
        manga: { id: createBookMarkDto.movieId },
        user: { _id: userId },
      },
    });
    if (candidate && createBookMarkDto.category != 'Удалить из закладок') {
      return candidate;
    }
    if (createBookMarkDto.category == 'Удалить из закладок') {
      await this.repository.delete(candidate._id);
      return candidate;
    }
    return this.repository.save({
      ...createBookMarkDto,
      user: { _id: userId },
      movie: { _id: createBookMarkDto.movieId },
    });
  }

  async getMarkForMovie(id: number, userId: number) {
    const book = await this.repository.findOne({
      where: { movie: { _id: id }, user: { _id: userId } },
    });
    return book;
  }

  findOne(id: number) {
    return this.repository.find({ where: { user: { _id: id } } });
  }

  async update(updateBookMarkDto: UpdateBookmarkDto, userId: number) {
    await this.repository.update(
      { movie: { _id: updateBookMarkDto.movieId }, user: { _id: userId } },
      {
        category: updateBookMarkDto.category,
        user: { _id: userId },
        movie: { _id: updateBookMarkDto.movieId },
      },
    );
    return this.repository.findOne({
      where: {
        movie: { _id: updateBookMarkDto.movieId },
        user: { _id: userId },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} bookmark`;
  }
}
