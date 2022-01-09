import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase';

class ResetPasswordUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase,
    );

    await resetPasswordUserUseCase.execute({ password, token });

    return response.status(204).send();
  }
}

export { ResetPasswordUserController };
