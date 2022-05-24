import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JoinToTeamDto } from './dto/join-to-team.dto';
import { TeamMemberEntity } from './entities/team-member.entity';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectRepository(TeamMemberEntity)
    private repository: Repository<TeamMemberEntity>,
  ) {}

  async getTeams(id: number) {
    try {
      const teams = await this.repository.find({ where: { user: { id } } });
      return teams;
    } catch (error) {
      console.log('EEEEEEEEERRRRRRRRROOOOOR', error);
    }
  }

  async addMemberForCreateTeam(teamId: number, userId: number) {
    try {
      return await this.repository.save({
        team: { _id: teamId },
        user: { _id: userId },
        roleInTeam: 'Глава',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async joinToTeam(joinToTeamDto: JoinToTeamDto) {
    const addMember = await this.repository.save({
      roleInTeam: joinToTeamDto.rank,
      user: { _id: joinToTeamDto.userId },
      team: { _id: joinToTeamDto.teamId },
    });
    return this.repository.findOne({ where: { _id: addMember._id } });
  }
  async removeMember(id: string) {
    const member = await this.repository.findOne({ where: { id } });
    await this.repository.delete(member._id);
    return member;
  }
  findAll() {
    return `This action returns all teamMember`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamMember`;
  }
}
