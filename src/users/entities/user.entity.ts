import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Pet } from '../../pets/entities/pet.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column({ nullable: true })
  password: string;
  @Column({ name: 'google_id', nullable: true })
  googleId: string;
  @Column({ name: 'apple_id', nullable: true })
  appleId: string;
  @Column({ name: 'facebook_id', nullable: true })
  facebookId: string;
  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;
  @Column({ name: 'profile_url' })
  profileUrl: string;
  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];
  @Column({ name: 'biometric_token', nullable: true })
  biometricToken: string;
  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;
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
