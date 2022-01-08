import { ICreateRentalsDTO } from '../dtos/ICreateRentalsDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  findById(id: string): Promise<Rental>;
  findByUserId(id: string): Promise<Rental[]>;
  findOpenRentalByCar(carId: string): Promise<Rental>;
  findOpenRentalByUser(userId: string): Promise<Rental>;
  create(data: ICreateRentalsDTO): Promise<Rental>;
  save(data: Rental): Promise<Rental>;
}

export { IRentalsRepository };
