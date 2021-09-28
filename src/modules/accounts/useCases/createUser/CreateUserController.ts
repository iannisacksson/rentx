import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { driver_license, email, name, password } = request.body;
    const { filename } = request.file;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      driverLicense: driver_license,
      email,
      name,
      password,
      filename,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
