import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name } = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase,
    );

    const cars = await listAvailableCarsUseCase.execute({
      brand: brand ? (brand as string) : undefined,
      categoryId: category_id ? (category_id as string) : undefined,
      name: name ? (name as string) : undefined,
    });

    return response.status(200).json(cars);
  }
}

export { ListAvailableCarsController };
