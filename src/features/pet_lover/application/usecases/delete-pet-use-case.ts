import { PetRepository } from "../../domain/repositories/adopt-pet-repository";

export class DeletePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async run(petId: number): Promise<boolean> {
    const pet = await this.petRepository.getPetById(petId);

    if (!pet) {
      throw new Error("La mascota no existe"); // Manejo de error si la mascota no existe
    }

    const isDeleted = await this.petRepository.deletePet(petId);
    return isDeleted;
  }
}
