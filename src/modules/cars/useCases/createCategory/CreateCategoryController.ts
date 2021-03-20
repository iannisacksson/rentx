import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  public handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    const category = this.createCategoryUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(category);
  }
}

export { CreateCategoryController };
