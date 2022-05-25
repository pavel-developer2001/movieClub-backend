import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEpisodeEntity } from 'src/team-episode/entities/team-episode.entity';
import { TeamMemberEntity } from 'src/team-member/entities/team-member.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamEntity } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private repository: Repository<TeamEntity>,
    @InjectRepository(TeamMemberEntity)
    private teamMemberRepository: Repository<TeamMemberEntity>,
    @InjectRepository(TeamEpisodeEntity)
    private teamEpisodeRepository: Repository<TeamEpisodeEntity>,
  ) {}

  create(createTeamDto: CreateTeamDto, userId: number) {
    return this.repository.save({ ...createTeamDto, user: { _id: userId } });
  }
  async addTeamCover(teamCover: string, id: number) {
    try {
      if (!teamCover) {
        return null;
      }
      await this.repository.update(id, { teamCover });
      return await this.repository.findOne({ where: { _id: id } });
    } catch (error) {
      console.error('error', error);
    }
  }

  async findOne(id: number) {
    try {
      const team = await this.repository.findOne({ where: { _id: id } });
      const members = await this.teamMemberRepository.find({
        where: { team: { _id: team._id } },
      });
      const episodes = await this.teamEpisodeRepository.find({
        where: { movie: { _id: id } },
        order: {
          _id: 'DESC',
        },
        relations: ['episode'],
      });
      return { team, members, episodes };
    } catch (error) {
      console.log(error);
    }
  }
}
