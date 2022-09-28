import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('posts', { schema: 'test' })
export class PostEntity {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 30 })
  title: string;

  @Column('int')
  userId: number;

  @Column('varchar', { length: 255 })
  contents: string | null;

  @Column('boolean')
  isShow: boolean;
}
