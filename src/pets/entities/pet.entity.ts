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
import { PetCertifications } from './petcertifications.entity';
import { PetDocs } from './petdocs.entity';
import { Marketplace } from '../../marketplace/entities/marketplace.entity';

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
  @OneToMany(() => PetCertifications, (petCerts) => petCerts.pet)
  petCertifications: string[];
  @OneToMany(() => PetDocs, (petDocs) => petDocs.pet)
  petDocuments: string[];
  @ManyToOne(() => Marketplace, (market) => market.pets)
  marketPlace: Marketplace;
  @Column({ default: false })
  isListedForAdoption: boolean;
  @Column({ default: false })
  isListedForSales: boolean;
  @Column({ nullable: true })
  sellPrice: number;
  @Column({ default: false })
  isNegotiable: boolean;
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
