import { Request, Response } from "express";

import { GetPetByOwnerIdUseCase } from "../../application/usecases/get-pet-by-owner-id-use-case";
export class GetPetByOwnerIdUseController {
  constructor(private getPetByOwnerIdUseCase: GetPetByOwnerIdUseCase) {}

  async run(request: Request, response: Response): Promise<Response> {
    try {
      const { ownerId } = request.params;

      const pets = await this.getPetByOwnerIdUseCase.run(Number(ownerId));

      return response.status(200).json(pets);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
