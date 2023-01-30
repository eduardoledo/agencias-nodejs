import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAgenciaInput } from './dto/create-agencia.input';
import { UpdateAgenciaInput } from './dto/update-agencia.input';

@Injectable()
export class AgenciaService {
  constructor(private prisma: PrismaService) { }

  async create(userId: number, createAgenciaInput: CreateAgenciaInput) {
    return await this.prisma.agencia.create({
      data: {
        userId,
        legajo: createAgenciaInput.legajo,
        nombre: createAgenciaInput.nombre,
      }
    });
  }

  findAll() {
    return this.prisma.agencia.findMany({
      include: {
        owner: true,
        employees: true,
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} agencia`;
  }

  update(id: number, updateAgenciaInput: UpdateAgenciaInput) {
    return `This action updates a #${id} agencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} agencia`;
  }
}
