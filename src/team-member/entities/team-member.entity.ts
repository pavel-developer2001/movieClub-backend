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

@Entity({ name: 'team-members', schema: 'public' })
export class TeamMemberEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ default: 'Участник' })
  roleInTeam: string;

  @ManyToOne(() => UserEntity, { eager: false })
  user: UserEntity;

  @ManyToOne(() => TeamEntity, { eager: false })
  team: TeamEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
