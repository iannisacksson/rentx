import { ICreateRentalsDTO } from '../dtos/ICreateRentalsDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  findOpenRentalByCar(carId: string): Promise<Rental>;
  findOpenRentalByUser(userId: string): Promise<Rental>;
  create(date: ICreateRentalsDTO): Promise<Rental>;
}

export { IRentalsRepository };
