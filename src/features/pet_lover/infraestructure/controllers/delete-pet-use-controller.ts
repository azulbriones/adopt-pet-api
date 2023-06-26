import { Request, Response } from "express";

import { DeletePetUseCase } from "../../application/usecases/delete-pet-use-case";
export class DeletePetUseController {
  constructor(private deletePetUseCase: DeletePetUseCase) {}

  async run(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const success = await this.deletePetUseCase.run(Number(id));

      if (success) {
        return response.status(204).send();
      } else {
        return response.status(404).json({ error: "Pet not found" });
      }
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
