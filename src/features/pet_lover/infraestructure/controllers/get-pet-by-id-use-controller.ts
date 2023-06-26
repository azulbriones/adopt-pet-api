import { Request, Response } from "express";

import { GetPetByIdUseCase } from "../../application/usecases/get-pet-by-id-use-case";
export class GetPetByIdUseController {
  constructor(private getPetByIdUseCase: GetPetByIdUseCase) {}

  async run(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const pet = await this.getPetByIdUseCase.run(Number(id));

      if (pet) {
        return response.status(200).json(pet);
      } else {
        return response.status(404).json({ error: "Pet not found" });
      }
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
