import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from './CreateRentalUseCase';

class CreateRentalController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, expected_return_date } = request.body;
    const { id } = request.user;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const car = await createRentalUseCase.execute({
      carId: car_id,
      expectedReturnDate: expected_return_date,
      userId: id,
    });

    return response.status(201).json(car);
  }
}

export { CreateRentalController };
