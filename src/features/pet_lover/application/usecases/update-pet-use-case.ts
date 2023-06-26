import { PetEntity } from "../../domain/entities/adopt-pet-entity";
import { PetRepository } from "../../domain/repositories/adopt-pet-repository";

export class UpdatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async run(
    petId: number,
    petData: Partial<PetEntity>
  ): Promise<PetEntity | null> {
    const existingPet = await this.petRepository.getPetById(petId);

    if (!existingPet) {
      throw new Error("La mascota no existe"); // Manejo de error si la mascota no existe
    }

    const updatedPet = { ...existingPet, ...petData };

    const result = await this.petRepository.updatePet(petId, updatedPet);

    if (!result) {
      throw new Error("Error al actualizar la mascota"); // Manejo de error si falla la actualización
    }

    return updatedPet;
  }
}
