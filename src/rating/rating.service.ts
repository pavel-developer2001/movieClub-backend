import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingEntity } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private repository: Repository<RatingEntity>,
  ) {}

  async create(createRatingDto: CreateRatingDto, userId: number) {
    const candidate = await this.repository.find({
      where: {
        movie: { _id: createRatingDto.movieId },
        user: { _id: userId },
      },
    });
    if (candidate.length > 0) {
      return candidate;
    }
    return this.repository.save({
      ...createRatingDto,
      movie: { _id: createRatingDto.movieId },
      user: { _id: userId },
    });
  }

  findAll() {
    return `This action returns all rating`;
  }

  findOne(id: number, userId: number) {
    return this.repository.findOne({
      where: { movie: { _id: id }, user: { _id: userId } },
    });
  }

  async update(updateRatingDto: UpdateRatingDto, userId: number) {
    const findRating = await this.repository.findOne({
      where: {
        movie: {
          _id: updateRatingDto.movieId,
          rating: updateRatingDto.rating,
        },
      },
    });
    if (findRating) {
      await this.repository.update(findRating._id, {
        rating: updateRatingDto.rating,
        user: { _id: userId },
        movie: { _id: updateRatingDto.movieId },
      });
      return await this.repository.findOne({ where: { _id: findRating._id } });
    }
    return 'Вы не можете обновить рейтинг';
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
