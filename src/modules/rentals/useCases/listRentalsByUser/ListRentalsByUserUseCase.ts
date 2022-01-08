import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsReposytory: IRentalsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsReposytory.findByUserId(userId);

    return rentals;
  }
}

export { ListRentalsByUserUseCase };
