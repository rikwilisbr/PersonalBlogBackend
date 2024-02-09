import { IsNotEmpty, IsString, IsEmpty, IsEmail } from 'class-validator';

export class NewsletterDto {
  @IsEmpty()
  public id: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string
}