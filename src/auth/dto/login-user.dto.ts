import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain at least one uppercase letter and one special character',
  })
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
