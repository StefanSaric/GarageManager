import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  Matches,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';
import { Role } from '../enum/role.enum';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain at least one uppercase letter and one special character',
  })
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  firstName?: string | null;

  @IsString()
  @IsOptional()
  lastName?: string | null;

  @IsString()
  @IsOptional()
  phone?: string | null;

  @IsEnum(Role, { message: 'role must be a valid role' })
  @IsOptional()
  roles?: Role;
}
