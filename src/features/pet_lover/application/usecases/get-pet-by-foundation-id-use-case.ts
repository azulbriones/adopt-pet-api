import { PetEntity } from "../../domain/entities/adopt-pet-entity";
import { PetRepository } from "../../domain/repositories/adopt-pet-repository";

export class GetPetByFoundationIdUseCase {
  constructor(private petRepository: PetRepository) {}

  async run(foundationId: number): Promise<PetEntity[] | null> {
    const pets = await this.petRepository.getPetsByFoundationId(foundationId);
    return pets;
  }
}
