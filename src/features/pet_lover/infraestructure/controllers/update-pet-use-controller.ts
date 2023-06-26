import { Request, Response } from "express";

import { UpdatePetUseCase } from "../../application/usecases/update-pet-use-case";
export class UpdatePetUseController {
  constructor(private updatePetUseCase: UpdatePetUseCase) {}

  async run(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const updateData = request.body;

      const updatedPet = await this.updatePetUseCase.run(
        Number(id),
        updateData
      );

      if (updatedPet) {
        return response.status(200).json(updatedPet);
      } else {
        return response.status(404).json({ error: "Pet not found" });
      }
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
