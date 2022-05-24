import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { EpisodeEntity } from './entities/episode.entity';

@Injectable()
export class EpisodeService {
  findAllForMovie(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(EpisodeEntity)
    private repository: Repository<EpisodeEntity>,
  ) {}
  async create(createEpisodeDto: CreateEpisodeDto, userId: number) {
    try {
      const findEpisode = await this.repository.findOne({
        where: {
          user: { _id: userId },
          movie: { _id: Number(createEpisodeDto.movieId) },
          season: createEpisodeDto.season,
          episode: createEpisodeDto.episode,
        },
      });
      if (findEpisode) {
        throw new HttpException(
          'Вы уже добавляли добавляли такой эпизод',
          HttpStatus.FORBIDDEN,
        );
      }
      return this.repository.save({
        ...createEpisodeDto,
        movie: { _id: Number(createEpisodeDto.movieId) },
        user: { _id: userId },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addEpisodeURL(url: string, id: number) {
    try {
      if (!url) {
        return null;
      }
      await this.repository.update(id, { url });
      return await this.repository.findOne({ where: { _id: id } });
    } catch (error) {
      console.error('error', error);
    }
  }

  async findAll() {
    return await this.repository.find({
      order: {
        _id: 'DESC',
      },
      relations: ['movie'],
    });
  }

  async findOne(id: number) {
    return await this.repository.findOne({ _id: id });
  }

  async findAllMovie(id: number) {
    return await this.repository.find({
      where: { movie: { _id: id } },
      order: {
        _id: 'DESC',
      },
    });
  }

  update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    return `This action updates a #${id} episode`;
  }

  remove(id: number) {
    return `This action removes a #${id} episode`;
  }
}
