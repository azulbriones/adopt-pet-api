import { PetEntity } from "../../domain/entities/adopt-pet-entity";
import { PetRepository } from "../../domain/repositories/adopt-pet-repository";

export class GetPetByIdUseCase {
  constructor(private petRepository: PetRepository) {}

  async run(petId: number): Promise<PetEntity | null> {
    const pet = await this.petRepository.getPetById(petId);
    return pet;
  }
}
