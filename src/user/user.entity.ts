import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Agencia } from 'src/agencia/entities/agencia.entity';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  email: string;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => [Agencia])
  agencias: Agencia[];

  @Field(() => Agencia)
  agencia?: Agencia;
}
