import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class AuthSigninRequest {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class AuthSignupRequest {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
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
