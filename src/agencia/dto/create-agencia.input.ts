import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAgenciaInput {
  @Field(() => Int)
  legajo: number;

  @Field(() => String)
  nombre: string;
}
