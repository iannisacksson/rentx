import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const filenames = images.map(file => file.filename);

    const carsImages = await uploadCarImageUseCase.execute({
      carId: id,
      imagesName: filenames,
    });

    return response.status(201).json(carsImages);
  }
}

export { UploadCarImageController };
