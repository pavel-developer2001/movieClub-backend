import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamInvitationDto } from './dto/create-team-invitation.dto';
import { TeamInvitationEntity } from './entities/team-invitation.entity';

@Injectable()
export class TeamInvitationService {
  constructor(
    @InjectRepository(TeamInvitationEntity)
    private repository: Repository<TeamInvitationEntity>,
  ) {}
  async create(createTeamInvitationDto: CreateTeamInvitationDto) {
    try {
      const candidate = await this.repository.findOne({
        where: {
          rank: createTeamInvitationDto.rank,
          user: { _id: createTeamInvitationDto.userId },
          team: { _id: createTeamInvitationDto.teamId },
        },
      });
      if (candidate) {
        throw new HttpException(
          'Данное приглашенние уже существует!',
          HttpStatus.FORBIDDEN,
        );
      }
      const addInvitation = await this.repository.save({
        rank: createTeamInvitationDto.rank,
        team: { _id: createTeamInvitationDto.teamId },
        user: { _id: createTeamInvitationDto.userId },
      });
      return this.repository.findOne({ where: { _id: addInvitation._id } });
    } catch (error) {
      console.log(error);
    }
  }
  getInvitationsForUser(id: string) {
    return this.repository.find({ where: { user: { _id: id } } });
  }
  async removeInvitation(id: number) {
    try {
      const invitation = await this.repository.findOne({ where: { _id: id } });
      await this.repository.delete(invitation._id);
      return invitation;
    } catch (error) {
      console.log(error);
    }
  }
}
