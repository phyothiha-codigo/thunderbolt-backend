import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PetImages } from './petimages.entity';
import { Species } from '../../species/entities/species.entity';
import { Bread } from '../../breads/entities/bread.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  age: number;
  @Column()
  color: string;
  @Column()
  description: string;
  @ManyToOne(() => User, (user) => user.pets)
  user: User;
  @OneToMany(() => PetImages, (petImages) => petImages.pet)
  petPhotos: PetImages[];
  @ManyToOne(() => Species, (species) => species.pets)
  species: Species;
  @ManyToOne(() => Bread, (bread) => bread.pets)
  bread: Bread;
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
