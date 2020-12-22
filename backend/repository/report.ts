import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Key } from './key';

@Entity({ name: 'reports' })
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => Key, (key) => key.id)
  key_id: number;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'time with time zone', nullable: false })
  created_at: Date;
}
