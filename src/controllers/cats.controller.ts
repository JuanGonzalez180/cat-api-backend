import type { Request, Response } from 'express';
import { catsService } from '../services/cats.service';

export class CatsController {
  async getBreeds(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;

      const breeds = await catsService.getBreeds(limit, page);

      res.status(200).json({
        success: true,
        data: breeds,
        count: breeds.length,
      });
    } catch (error) {
      console.error('Error in getBreeds:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getBreedById(req: Request, res: Response): Promise<void> {
    try {
      const { breed_id } = req.params;

      if (!breed_id) {
        res.status(400).json({
          success: false,
          message: 'Breed ID is required',
        });
        return;
      }

      const breed = await catsService.getBreedById(breed_id);

      res.status(200).json({
        success: true,
        data: breed,
      });
    } catch (error) {
      console.error('Error in getBreedById:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async searchBreeds(req: Request, res: Response): Promise<void> {
    try {
      const { q, limit, page } = req.query;

      if (!q) {
        res.status(400).json({
          success: false,
          message: 'Search query (q) is required',
        });
        return;
      }

      const results = await catsService.searchBreeds({
        q: q as string,
        limit: limit ? parseInt(limit as string) : 10,
        page: page ? parseInt(page as string) : 0,
      });

      res.status(200).json({
        success: true,
        data: results,
        count: results.length,
      });
    } catch (error) {
      console.error('Error in searchBreeds:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}

export const catsController = new CatsController();
