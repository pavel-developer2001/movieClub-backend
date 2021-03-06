import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    return await this.repository.save({
      ...createCommentDto,
      movie: { _id: createCommentDto.movieId },
      user: { _id: userId },
    });
  }

  async findOne(id: number) {
    return await this.repository.find({
      where: {
        movie: { _id: id },
      },
      order: {
        _id: 'DESC',
      },
    });
  }
  async old(id: number) {
    return await this.repository.find({
      where: {
        movie: { _id: id },
      },
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  async popular(id: number) {
    try {
      const qb = this.repository
        .createQueryBuilder()
        .where({ movie: { _id: id } });

      qb.orderBy('count_likes', 'DESC');
      const [items, count] = await qb.getManyAndCount();
      return { items, count };
    } catch (error) {
      console.log(error);
    }
  }
}
