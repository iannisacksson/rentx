import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const { id } = request.user;

    const updateUserAvatar = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatar.execute({ filename, userId: id });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
