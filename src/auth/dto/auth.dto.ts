import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
  @IsString()
  public password: string;
}