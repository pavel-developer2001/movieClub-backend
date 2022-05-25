import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  forwardRef,
  Inject,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/user/user.decorator';
import { TeamMemberService } from 'src/team-member/team-member.service';
import { TeamInvitationService } from 'src/team-invitation/team-invitation.service';
import { CreateTeamInvitationDto } from 'src/team-invitation/dto/create-team-invitation.dto';
import { JoinToTeamDto } from 'src/team-member/dto/join-to-team.dto';

@Controller('team')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    @Inject(forwardRef(() => CloudinaryService))
    private cloudinary: CloudinaryService,
    private readonly teamMemberService: TeamMemberService,
    private readonly teamInvitationService: TeamInvitationService,
  ) {}
  @Get('user/:id')
  async getAllTeamForUser(@Param('id') id: number) {
    try {
      return await this.teamMemberService.getTeams(id);
    } catch (error) {
      console.error('IHDIHVDIHVIDI', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('teamCover'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTeamDto: CreateTeamDto,
    @User() userId: number,
  ) {
    const newTeam = await this.teamService.create(createTeamDto, userId);
    await this.cloudinary.uploadTeamCover(file, newTeam._id);
    await this.teamMemberService.addMemberForCreateTeam(
      newTeam._id,
      newTeam.user._id,
    );
    return this.teamService.findOne(newTeam._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('invitation/')
  invitationInTeamForUser(
    @Body() createTeamInvitationDto: CreateTeamInvitationDto,
  ) {
    return this.teamInvitationService.create(createTeamInvitationDto);
  }
  @Get('invitation/user/:id')
  getAllInvitationsForUser(@Param('id') id: string) {
    return this.teamInvitationService.getInvitationsForUser(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('invitation/user/join')
  async agreeToJoinInTeam(@Body() joinToTeamDto: JoinToTeamDto) {
    const newMember = await this.teamMemberService.joinToTeam(joinToTeamDto);
    const deleteInvitation = await this.teamInvitationService.removeInvitation(
      joinToTeamDto.invitationId,
    );
    return { newMember, deleteInvitation };
  }

  @Delete('invitation/user/refusal/:id')
  refusalToJoinTeam(@Param('id') id: number) {
    return this.teamInvitationService.removeInvitation(id);
  }

  @Delete('member/:id')
  removeMemberFromTeam(@Param('id') id: string) {
    return this.teamMemberService.removeMember(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id);
  }
}
