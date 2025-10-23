import type { CatImage } from '../interfaces/breed.interface';
import { catApiClient } from '../config/axios';

export class ImagesService {
  private axiosInstance = catApiClient;

  async getImagesByBreedId(
    breedId: string,
    limit: number = 10,
    page: number = 0
  ): Promise<CatImage[]> {
    try {
      if (!breedId || breedId.trim().length === 0) {
        throw new Error('Breed ID is required');
      }

      const response = await this.axiosInstance.get<CatImage[]>('/images/search', {
        params: {
          breed_ids: breedId.trim(),
          limit,
          page,
        },
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching images for breed ${breedId}:`, error);
      throw new Error(`Failed to fetch images for breed: ${breedId}`);
    }
  }

  async getImageById(imageId: string): Promise<CatImage> {
    try {
      if (!imageId || imageId.trim().length === 0) {
        throw new Error('Image ID is required');
      }

      const response = await this.axiosInstance.get<CatImage>(
        `/images/${imageId.trim()}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching image ${imageId}:`, error);
      throw new Error(`Failed to fetch image with ID: ${imageId}`);
    }
  }
}

export const imagesService = new ImagesService();
