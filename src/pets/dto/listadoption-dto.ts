
import { ApiProperty } from "@nestjs/swagger";

export class ListadoptionDto {
  @ApiProperty({
    example: 'Rex',
    description: 'name',
  })
  petId: string;
}
