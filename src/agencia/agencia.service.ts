import { Injectable } from '@nestjs/common';
import { CreateAgenciaInput } from './dto/create-agencia.input';
import { UpdateAgenciaInput } from './dto/update-agencia.input';

@Injectable()
export class AgenciaService {
  create(createAgenciaInput: CreateAgenciaInput) {
    return 'This action adds a new agencia';
  }

  findAll() {
    return;
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
