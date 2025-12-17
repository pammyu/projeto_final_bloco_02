import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
    });

    if (!categoria)
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );

    return categoria;
  }

  async findAllByNome(nome: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    const categoria = await this.findById(id);

    if (categoria.emEstoque) {
      throw new HttpException(
        'Categoria não pode ser deletada pois possui produtos em estoque!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.categoriaRepository.delete(id);
  }

  async findByEstoque(status: string) {
    const emEstoque = status === 'true';

    const categorias = await this.categoriaRepository.find({
      where: {
        emEstoque,
      },
    });

    if (categorias.length === 0) {
      throw new HttpException(
        `Não existem categorias ${emEstoque ? 'em estoque' : 'fora de estoque'} no momento!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return categorias;
  }

  async toggleEstoque(id: number): Promise<Categoria> {
    const categoria = await this.findById(id);

    categoria.emEstoque = !categoria.emEstoque;

    return this.categoriaRepository.save(categoria);
  }
}
