import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'keys' })
export class Key {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', unique: true, nullable: false })
  alias: string;

  @Column({ type: 'text', nullable: false })
  url: string;

  @Column({ default: false })
  secure: boolean;

  @Column({ type: 'text', default: '' })
  redirect: string;

  @Column({ type: 'timestamptz', nullable: false })
  expires_at: Date;

  @CreateDateColumn({ nullable: false })
  created_at: Date;
}
