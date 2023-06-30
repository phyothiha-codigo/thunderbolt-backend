import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bread } from '../../breads/entities/bread.entity';
import { Pet } from '../../pets/entities/pet.entity';

@Entity()
export class Species {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'species_name' })
  speciesName: string;
  @Column({ name: 'species_thumbnail', default: '' })
  speciesThumbnail: string;
  @OneToMany(() => Bread, (bread) => bread.species)
  breads: Bread[];
  @OneToMany(() => Pet, (pet) => pet.species)
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
