import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
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

  @IsNotEmpty({ message: 'Please Provide Game File' })
  @IsString({ message: 'Game File Must Be A base64 String' })
  banner: string;

  @IsNotEmpty({ message: 'Please Provide Banner' })
  @IsString({ message: 'Banner Must Be A base64 String' })
  game_file: any;

  owner_id: string;
}

export class UpdateGameDto {
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

  @ValidateIf((o) => o.banner !== undefined)
  banner: string;

  @ValidateIf((o) => o.game_file !== undefined)
  game_file: any;

  owner_id: string;
}
