import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  //   @Column()
  //   userId: string;

  @Column()
  userName: string;

  @Column()
  userEmail: string;

  @Column()
  age: string;
}
