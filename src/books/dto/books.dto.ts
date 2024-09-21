import {
  IsOptional,
  IsDefined,
  IsString,
  Length,
  IsArray,
} from 'class-validator';

export class CreateBookDto {
  @IsDefined()
  @IsString()
  @Length(10, 50)
  title: string;

  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description: string;

  @IsDefined()
  @IsString()
  @Length(0, 500)
  authors: string;

  @IsOptional()
  @IsString()
  favorite: string;

  @IsOptional()
  @IsString()
  fileCover: string;

  @IsOptional()
  @IsString()
  fileName: string;

  @IsOptional()
  @IsString()
  fileBook: string;

  @IsOptional()
  @IsArray()
  comment: string[];
}

export class UpdateBookDto {
  @IsDefined()
  @IsString()
  @Length(10, 50)
  title: string;

  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description: string;

  @IsDefined()
  @IsString()
  @Length(0, 500)
  authors: string;

  @IsOptional()
  @IsString()
  favorite: string;

  @IsOptional()
  @IsString()
  fileCover: string;

  @IsOptional()
  @IsString()
  fileName: string;

  @IsOptional()
  @IsString()
  fileBook: string;

  @IsOptional()
  @IsArray()
  comment: string[];
}
