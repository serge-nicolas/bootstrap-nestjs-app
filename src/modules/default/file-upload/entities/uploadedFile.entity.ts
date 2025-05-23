import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  Index,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
@Index(['uuid'], { unique: true })
export class UploadedFile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  localUrl: string;

  @Column()
  url: string;

  @Column()
  originalName: string;

  @Column()
  tmpfileName: string;

  @Column()
  size: number;

  @Column()
  mimeType: string;
}
// auto values not working
