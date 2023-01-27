import { CreateAgenciaInput } from './create-agencia.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAgenciaInput extends PartialType(CreateAgenciaInput) {
  @Field(() => Int)
  id: number;
}
