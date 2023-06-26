import { PetRepository } from "../../domain/repositories/adopt-pet-repository";

export class AddNewPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async run({
    pet_name,
    pet_image,
    age,
    pet_breed,
    info,
    address,
    status,
    foundation_id,
    owner_id,
  }: {
    pet_name: string;
    pet_image: string | null;
    age: number | null;
    pet_breed: string | null;
    info: string;
    address: string;
    status: string;
    foundation_id: number | null;
    owner_id: number | null;
  }) {
    return await this.petRepository.createPet(
      pet_name,
      pet_image,
      age,
      pet_breed,
      info,
      address,
      status,
      foundation_id,
      owner_id
    );
  }
}
