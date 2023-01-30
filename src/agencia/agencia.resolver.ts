import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AgenciaService } from './agencia.service';
import { Agencia } from './entities/agencia.entity';
import { CreateAgenciaInput } from './dto/create-agencia.input';
import { UpdateAgenciaInput } from './dto/update-agencia.input';
import { CurrentUserId } from 'src/auth/decorators/currentUserId.decorator';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from 'src/auth/guards/refreshToken.guard';

@Resolver(() => Agencia)
export class AgenciaResolver {
  constructor(private readonly agenciaService: AgenciaService) { }

  @UseGuards(RefreshTokenGuard)
  @Mutation(() => Agencia)
  async createAgencia(
    @CurrentUserId() userId,
    @Args('createAgenciaInput') createAgenciaInput: CreateAgenciaInput,
  ) {
    return await this.agenciaService.create(userId, createAgenciaInput);
  }

  @Query(() => [Agencia], { name: 'agencias' })
  findAll() {
    return this.agenciaService.findAll();
  }

  @Query(() => Agencia, { name: 'agencia' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.agenciaService.findOne(id);
  }

  @Mutation(() => Agencia)
  updateAgencia(
    @Args('updateAgenciaInput') updateAgenciaInput: UpdateAgenciaInput,
  ) {
    return this.agenciaService.update(
      updateAgenciaInput.id,
      updateAgenciaInput,
    );
  }

  @Mutation(() => Agencia)
  removeAgencia(@Args('id', { type: () => Int }) id: number) {
    return this.agenciaService.remove(id);
  }
}
