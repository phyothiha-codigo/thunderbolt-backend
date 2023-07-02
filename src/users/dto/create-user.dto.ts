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
    example: {
      username: 'John Doe',
      email: 'test1@yopmail.com',
      password: 'abc123',
      profile_url: 'https://www.image.com/img.jpg',
      pets: [
        {
          name: 'test',
          age: 1,
          color: 'red',
          description: 'test',
          species: {
            id: '68a0d09c-1553-46bc-b682-3569097bbf5d',
          },
          bread: {
            id: 'f21741e5-0582-4204-8bbd-e213ca6bb53f',
          },
        },
      ],
    },
    description: 'The pets of user',
    type: Pet,
  })
  pets: Pet[] | [];
}
