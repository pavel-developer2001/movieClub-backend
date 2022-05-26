import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreService } from 'src/genre/genre.service';
import { UserService } from 'src/user/user.service';
import { getConnection, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { SearchMovieDto } from './dto/search-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private repository: Repository<MovieEntity>,
    private genreService: GenreService,
    private userService: UserService,
  ) {}

  async create(createMovieDto: CreateMovieDto, userId: number) {
    try {
      const connection = getConnection();
      const genres = [];
      for (const genre of createMovieDto.genres) {
        const savedGenre = await this.genreService.findOrCreate(genre);
        genres.push(savedGenre);
      }
      const movie = new MovieEntity();
      movie.title = createMovieDto.title;
      movie.englishTitle = createMovieDto.englishTitle;
      movie.description = createMovieDto.description;
      movie.status = createMovieDto.status;
      movie.year = createMovieDto.year;
      movie.munites = createMovieDto.munites;
      movie.age = createMovieDto.age;
      movie.country = createMovieDto.country;
      movie.type = createMovieDto.type;
      movie.user = await this.userService.findById(userId);
      movie.genres = genres;
      return await connection.manager.save(movie);
    } catch (error) {
      console.log(error);
    }
  }
  async addMovieCover(cover: string, id: number) {
    try {
      if (!cover) {
        return null;
      }
      await this.repository.update(id, { cover });
      return await this.repository.findOne({ where: { _id: id } });
    } catch (error) {
      console.error('error', error);
    }
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ _id: id });
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }

  async search(dto: SearchMovieDto) {
    try {
      console.log(dto.title);
      const qb = this.repository.createQueryBuilder('movie');
      qb.leftJoinAndSelect('movie.user', 'user');
      if (dto.title) {
        qb.andWhere('movie.title ILIKE :title', {
          title: `%${dto.title.toLowerCase()}%`,
        });
      }
      qb.setParameters({
        title: `%${dto.title.toLowerCase()}%`,
      });
      const items = await qb.getMany();
      console.log(items);
      return items;
    } catch (error) {
      console.log(error);
    }
  }
}
