import { IsNotEmpty, IsString, IsEmpty } from 'class-validator';

export class PostsDto {
  @IsEmpty()
  public id: string;

  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public description: string;
 
  @IsNotEmpty()
  @IsString()
  public markdown: string;

  @IsNotEmpty()
  @IsString()
  public tags: string;
}