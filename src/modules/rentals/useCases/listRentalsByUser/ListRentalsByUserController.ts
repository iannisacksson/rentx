import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

class ListRentalsByUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase,
    );

    const rentals = await listRentalsByUserUseCase.execute({ userId });

    return response.status(200).json(rentals);
  }
}

export { ListRentalsByUserController };
