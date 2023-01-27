import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignUpInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;
}
