import { Module } from '@nestjs/common';
import { AgenciaService } from './agencia.service';
import { AgenciaResolver } from './agencia.resolver';

@Module({
  providers: [AgenciaResolver, AgenciaService],
})
export class AgenciaModule {}
