import { TeamEntity } from 'src/team/entities/team.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'team-invitations' })
export class TeamInvitationEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ default: 'Участник' })
  rank: string;

  @ManyToOne(() => UserEntity, { eager: false })
  user: UserEntity;

  @ManyToOne(() => TeamEntity, { eager: false })
  team: TeamEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
