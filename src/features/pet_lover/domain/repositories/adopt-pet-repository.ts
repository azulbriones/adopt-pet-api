import { PetEntity } from "../entities/adopt-pet-entity";

export interface PetRepository {
  createPet(
    pet_name: string,
    pet_image: string | null,
    age: number | null,
    pet_breed: string | null,
    info: string,
    address: string,
    status: string,
    foundation_id: number | null,
    owner_id: number | null
  ): Promise<PetEntity | null>;

  getAllPets(): Promise<PetEntity[]>;
  getPetById(id: number): Promise<PetEntity | null>;
  getPetsByOwnerId(ownerId: number): Promise<PetEntity[]>;
  getPetsByFoundationId(foundationId: number): Promise<PetEntity[]>;

  updatePet(id: number, petData: Partial<PetEntity>): Promise<PetEntity | null>;

  deletePet(id: number): Promise<boolean>;
}
