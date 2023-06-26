import { Request, Response } from "express";

import { GetPetByFoundationIdUseCase } from "../../application/usecases/get-pet-by-foundation-id-use-case";
export class GetPetByFoundationIdUseController {
  constructor(
    private getPetByFoundationIdUseCase: GetPetByFoundationIdUseCase
  ) {}

  async run(request: Request, response: Response): Promise<Response> {
    try {
      const { foundationId } = request.params;

      const pets = await this.getPetByFoundationIdUseCase.run(
        Number(foundationId)
      );

      return response.status(200).json(pets);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
