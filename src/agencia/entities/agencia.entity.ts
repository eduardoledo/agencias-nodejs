import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class Agencia {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  legajo: number;

  @Field(() => String)
  nombre: string;

  @Field(() => User)
  owner: User;

  @Field(() => [User])
  employees: User[];
}
