import { IsNotEmpty } from 'class-validator';

export class CreateLocationDTO {
  @IsNotEmpty()
  locationName: string[];

  @IsNotEmpty()
  category: string;

  img: string;

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longitude: string;

  room: string[];
}
