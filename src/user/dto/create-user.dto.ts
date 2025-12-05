import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from '../enum/role.enum';

export class CreateUserDto {
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

  @IsEnum(Role, { message: 'role must be a valid role' })
  @IsOptional()
  roles?: Role;
}
