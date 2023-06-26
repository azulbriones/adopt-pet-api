import { Request, Response } from "express";

import { GetAllPetsUseCase } from "../../application/usecases/get-all-pets-use-case";
export class GetAllPetsUseController {
  constructor(private getAllPetsUseCase: GetAllPetsUseCase) {}

  async run(request: Request, response: Response): Promise<Response> {
    try {
      const pets = await this.getAllPetsUseCase.run();

      return response.status(200).json(pets);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
