import type { Breed, BreedSearchParams } from '../interfaces/breed.interface';
import { catApiClient } from '../config/axios';

export class CatsService {
  private axiosInstance = catApiClient;

  async getBreeds(limit: number = 10, page: number = 0): Promise<Breed[]> {
    try {
      const response = await this.axiosInstance.get<Breed[]>('/breeds', {
        params: {
          limit,
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching breeds:', error);
      throw new Error('Failed to fetch breeds from TheCatAPI');
    }
  }

  async getBreedById(breedId: string): Promise<Breed> {
    try {
      const response = await this.axiosInstance.get<Breed>(`/breeds/${breedId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching breed ${breedId}:`, error);
      throw new Error(`Failed to fetch breed with ID: ${breedId}`);
    }
  }

  async searchBreeds(params: BreedSearchParams): Promise<Breed[]> {
    try {
      const { q, limit = 10, page = 0 } = params;

      if (!q || q.trim().length === 0) {
        throw new Error('Search query is required');
      }

      const response = await this.axiosInstance.get<Breed[]>('/breeds/search', {
        params: {
          q: q.trim(),
          limit,
          page,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error searching breeds:', error);
      throw new Error('Failed to search breeds from TheCatAPI');
    }
  }
}

export const catsService = new CatsService();
