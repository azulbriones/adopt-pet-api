export interface PetModel {
  id?: number;
  pet_name: string;
  pet_image?: string;
  age?: number;
  pet_breed?: string;
  info: string;
  address: string;
  status: string;
  foundation_id?: number;
  owner_id?: number;
  created_at?: string | null;
}
