import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: userId } = request.user;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({ id, userId });

    return response.status(200).json(rental);
  }
}

export { DevolutionRentalController };
