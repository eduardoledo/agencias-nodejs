import { Module } from '@nestjs/common';
import { AgenciaService } from './agencia.service';
import { AgenciaResolver } from './agencia.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    AgenciaResolver,
    AgenciaService,
    PrismaService,
  ],
})
export class AgenciaModule { }
