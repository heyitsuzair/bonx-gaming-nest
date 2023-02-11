import { IsNotEmpty, ValidateIf } from 'class-validator';
export class CreateGameDto {
  @IsNotEmpty({ message: 'Title Is Required' })
  title: string;

  @IsNotEmpty({ message: 'Short Description Is Required' })
  short_description: string;

  @IsNotEmpty({ message: 'Long Description Is Required' })
  long_description: string;

  @IsNotEmpty({ message: 'Features Are Required' })
  features: string;

  @ValidateIf((o) => o.whats_new !== undefined)
  whats_new: string;

  @IsNotEmpty({ message: 'Total Installs Is Required' })
  installs: string;

  @IsNotEmpty({ message: 'Current Version Is Required' })
  current_version: string;

  @IsNotEmpty({ message: 'Category Is Required' })
  category: string;

  banner: any;

  game_file: any;

  owner_id: string;
}
