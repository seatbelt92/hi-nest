import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts', { schema: 'test' })
export class PostEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 30 })
  title: string;

  @Column('int')
  userId: string;

  @Column('varchar', { length: 255 })
  contents: string;
}
