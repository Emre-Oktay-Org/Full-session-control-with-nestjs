import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class AuthSigninRequest {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: "string", description: "users email" })
  email: string;

  @IsNotEmpty()
  password: string;
}

export class AuthSignupRequest {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: "string", format: "email" })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ type: "string", format: "text or number"})
  password: string;

  @IsNotEmpty()
  @ApiProperty({ type: "string"})
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ type: "string"})
  lastName: string;
}

export class AuthSiginInRequest {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: "string", format: "email" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: "string", format: "text or number"})
  password: string;
}

export class AuthEmailConfirmRequest {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class AuthForgotPasswordRequest {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class AuthResetPasswordRequest {
  @IsNotEmpty()
  password: string;
}
