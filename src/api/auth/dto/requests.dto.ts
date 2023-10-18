import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class AuthSigninRequest {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string;
    
    @IsNotEmpty()
    password:string;
}