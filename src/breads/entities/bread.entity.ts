import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Species } from '../../species/entities/species.entity';
import { Pet } from '../../pets/entities/pet.entity';

@Entity()
export class Bread {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'bread_name' })
  breadName: string;
  @Column({ name: 'bread_thumbnail_url' })
  breadThumbnailUrl: string;
  @ManyToOne(() => Species, (species) => species.breads)
  species: Species;
  @OneToMany(() => Pet, (pet) => pet.bread)
  pets: Pet[];
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
