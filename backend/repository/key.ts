import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'keys' })
export class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true, nullable: false })
  alias: string;

  @Column({ type: 'text', nullable: false })
  url: string;

  @Column()
  is_secure: boolean;

  @Column({ type: 'time with time zone', nullable: false })
  created_at: Date;
}
