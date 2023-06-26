import { PetEntity } from "../../domain/entities/adopt-pet-entity";
import { PetRepository } from "../../domain/repositories/adopt-pet-repository";

export class GetAllPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async run(): Promise<PetEntity[]> {
    const pets = await this.petRepository.getAllPets();
    return pets;
  }
}
