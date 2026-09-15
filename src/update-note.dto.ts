import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty({ message: 'text is required' })
  text: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}