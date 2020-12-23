import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

// entities
import { Key } from './key';

@Entity({ name: 'reports' })
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid', { name: 'report_id' })
  reportId: string;

  @Column({ name: 'key_id', nullable: false })
  @OneToOne((type) => Key)
  keyId: number;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn({ nullable: false })
  created_at: Date;
}
