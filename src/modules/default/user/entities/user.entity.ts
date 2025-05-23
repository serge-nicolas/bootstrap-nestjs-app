import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Index,
  CreateDateColumn,
  Generated,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index(['email'], { unique: true })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ nullable: true })
  firstName: string;

  @Column()
  userlogin: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: false })
  password: string;
}
