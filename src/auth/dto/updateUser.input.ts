import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {

  @IsString()
  @Field(() => String)
  firstName: string;

  @IsString()
  @Field(() => String)
  lastName: string;

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
