import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const checkNameProductExists = this.productsRepository.findByName(name);

    if (checkNameProductExists) {
      throw new AppError('Name already used.');
    }

    const product = await this.productsRepository.create({
      quantity,
      price,
      name,
    });

    return product;
  }
}

export default CreateProductService;
