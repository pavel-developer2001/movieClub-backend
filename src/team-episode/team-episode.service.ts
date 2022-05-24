import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamEpisodeEntity } from './entities/team-episode.entity';

@Injectable()
export class TeamEpisodeService {
  constructor(
    @InjectRepository(TeamEpisodeEntity)
    private repository: Repository<TeamEpisodeEntity>,
  ) {}

  async addEpisodeForTeam(episodeId: number, movieId: number, teamId: number) {
    const candidate = await this.repository.findOne({
      where: {
        episode: { _id: episodeId },
        movie: { _id: movieId },
        team: { _id: teamId },
      },
    });
    if (candidate) {
      throw new HttpException(
        'Данный эпизо этой командой уже добавлен!',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.repository.save({
      episode: { _id: episodeId },
      movie: { _id: movieId },
      team: { _id: teamId },
    });
  }
}
