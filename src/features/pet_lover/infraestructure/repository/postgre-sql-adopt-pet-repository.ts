import { Pool, PoolClient } from "pg";

import { PetEntity } from "../../domain/entities/adopt-pet-entity";
import { PetRepository } from "../../domain/repositories/adopt-pet-repository";
import pool from "../config/postgre-sql-config";

export class PostgreSqlAdoptPetRepository implements PetRepository {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async createPet(
    pet_name: string,
    pet_image: string | null,
    age: number | null,
    pet_breed: string | null,
    info: string,
    address: string,
    status: string,
    foundation_id: number | null,
    owner_id: number | null
  ): Promise<PetEntity | null> {
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();

      const query =
        "INSERT INTO adopt_pets (pet_name, pet_image, age, pet_breed, info, address, status, foundation_id, owner_id) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
      const values = [
        pet_name,
        pet_image,
        age,
        pet_breed,
        info,
        address,
        status,
        foundation_id,
        owner_id,
      ];
      const result = await client.query(query, values);

      if (result.rowCount === 1) {
        const createdPet = result.rows[0];
        return new PetEntity(
          createdPet.id,
          createdPet.pet_name,
          createdPet.pet_image,
          createdPet.age,
          createdPet.pet_breed,
          createdPet.info,
          createdPet.address,
          createdPet.status,
          createdPet.foundation_id,
          createdPet.owner_id,
          createdPet.created_at
        );
      }
      return null;
    } catch (error) {
      console.error("Error creating pet:", error);
      return null;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async getAllPets(): Promise<PetEntity[]> {
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();

      const query = "SELECT * FROM adopt_pets";
      const result = await client.query(query);

      const pets: PetEntity[] = result.rows.map((row) => ({
        id: row.id,
        pet_name: row.pet_name,
        pet_image: row.pet_image,
        age: row.age,
        pet_breed: row.pet_breed,
        info: row.info,
        address: row.address,
        status: row.status,
        foundation_id: row.foundation_id,
        owner_id: row.owner_id,
        created_at: row.created_at,
      }));

      return pets;
    } catch (error) {
      console.error("Error retrieving pets:", error);
      return [];
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async getPetById(id: number): Promise<PetEntity | null> {
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();

      const query = "SELECT * FROM adopt_pets WHERE id = $1";
      const values = [id];
      const result = await client.query(query, values);

      if (result.rowCount === 1) {
        const petRow = result.rows[0];
        return new PetEntity(
          petRow.id,
          petRow.pet_name,
          petRow.pet_image,
          petRow.age,
          petRow.pet_breed,
          petRow.info,
          petRow.address,
          petRow.status,
          petRow.foundation_id,
          petRow.owner_id,
          petRow.created_at
        );
      }
      return null;
    } catch (error) {
      console.error("Error retrieving pet by ID:", error);
      return null;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async getPetsByOwnerId(ownerId: number): Promise<PetEntity[]> {
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();

      const query = "SELECT * FROM adopt_pets WHERE owner_id = $1";
      const values = [ownerId];
      const result = await client.query(query, values);

      const pets: PetEntity[] = result.rows.map((row) => ({
        id: row.id,
        pet_name: row.pet_name,
        pet_image: row.pet_image,
        age: row.age,
        pet_breed: row.pet_breed,
        info: row.info,
        address: row.address,
        status: row.status,
        foundation_id: row.foundation_id,
        owner_id: row.owner_id,
        created_at: row.created_at,
      }));

      return pets;
    } catch (error) {
      console.error("Error retrieving pets by owner ID:", error);
      return [];
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async getPetsByFoundationId(foundationId: number): Promise<PetEntity[]> {
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();

      const query = "SELECT * FROM adopt_pets WHERE foundation_id = $1";
      const values = [foundationId];
      const result = await client.query(query, values);

      const pets: PetEntity[] = result.rows.map((row) => ({
        id: row.id,
        pet_name: row.pet_name,
        pet_image: row.pet_image,
        age: row.age,
        pet_breed: row.pet_breed,
        info: row.info,
        address: row.address,
        status: row.status,
        foundation_id: row.foundation_id,
        owner_id: row.owner_id,
        created_at: row.created_at,
      }));

      return pets;
    } catch (error) {
      console.error("Error retrieving pets by foundation ID:", error);
      return [];
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async deletePet(id: number): Promise<boolean> {
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();

      const query = "DELETE FROM adopt_pets WHERE id = $1";
      const values = [id];
      const result = await client.query(query, values);

      return result.rowCount === 1;
    } catch (error) {
      console.error("Error deleting pet:", error);
      return false;
    } finally {
      if (client) {
        client.release();
      }
    }
  }
  async updatePet(
    id: number,
    petData: Partial<PetEntity>
  ): Promise<PetEntity | null> {
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();

      const updateFields: string[] = [];
      const values: (string | number | Date)[] = [id];

      Object.entries(petData).forEach(([key, value]) => {
        if (value !== null) {
          updateFields.push(`${key} = $${values.length + 1}`);
          values.push(value);
        }
      });

      const query = `
        UPDATE adopt_pets
        SET ${updateFields.join(", ")}
        WHERE id = $1
        RETURNING *
      `;

      const result = await client.query(query, values);

      if (result.rowCount === 1) {
        const updatedPet = result.rows[0];
        return new PetEntity(
          updatedPet.id,
          updatedPet.pet_name,
          updatedPet.pet_image,
          updatedPet.age,
          updatedPet.pet_breed,
          updatedPet.info,
          updatedPet.address,
          updatedPet.status,
          updatedPet.foundation_id,
          updatedPet.owner_id,
          updatedPet.created_at
        );
      }
      return null;
    } catch (error) {
      console.error("Error updating pet:", error);
      return null;
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}
