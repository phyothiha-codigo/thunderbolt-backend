import { Pet } from '../../pets/entities/pet.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of User',
  })
  username: string;
  @ApiProperty({
    example: 'test@yopmail.com',
    description: 'The email of user',
  })
  email: string;
  @ApiProperty({
    example: '#$%^&*(',
    description: 'The password of user',
  })
  password: string;
  @ApiProperty({
    example: '001',
    description: 'The google id of user',
  })
  google_id?: string;
  @ApiProperty({
    example: '001',
    description: 'The fb id of user',
  })
  facebook_id?: string;
  @ApiProperty({
    example: '001',
    description: 'The apple id of user',
  })
  apple_id?: string;
  @ApiProperty({
    example: 'https://www.image.com/img.jpg',
    description: 'The profile image url of user',
  })
  profile_url?: string;
  @ApiProperty({
    example: Pet,
    description: 'The pets of user',
  })
  pets: Pet[] | [];
}
